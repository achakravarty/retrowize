'use strict';

import React from 'react';
import Card from './card.jsx';
import TextField from 'material-ui/lib/text-field';
import Paper from 'material-ui/lib/paper';
import IconButton from 'material-ui/lib/icon-button';
import FloatingActionButton from 'material-ui/lib/floating-action-button';
import FontIcon from 'material-ui/lib/font-icon';
import boardActions from './board-actions';
import boardStore from './board-store';
import BoardEvents from './board-events';
import analytics from './analytics';

var Lane = React.createClass( {

	getInitialState(){
		return {
			color: "lightyellow",
			isAddDisabled: true,
			user: boardStore.getUser()
		};
	},

	componentWillMount() {
		boardStore.addListener(BoardEvents.USER_UPDATED ,this.updateUser);
	},

	componentWillUnmount() {
		boardStore.removeListener(BoardEvents.USER_UPDATED, this.updateUser);
	},

	updateUser(){
		this.setState({ user: boardStore.getUser()});
	},

	addNewCard(){
		let card = {
			content : this.state.newCardContent,
			likes: 0
		};
		boardActions.addCard(card,this.props.id);
		analytics.trackBoardEvent('add-card', this.props.boardId);
		this.setState({isAddDisabled: true, newCardContent: ''});
	},

	onLike(card) {
		card.likes = card.likes + 1;
		boardActions.voteCard(card, this.props.id);
		analytics.trackBoardEvent('vote-card', this.props.boardId);
	},

	removeCard(card) {
		boardActions.removeCard(card, this.props.id);
		analytics.trackBoardEvent('remove-card', this.props.boardId);
	},

	newCardContentChanged(event){
		var newCardContent = event.target.value;
		var disable =  newCardContent.length === 0;
		this.setState({isAddDisabled: disable, newCardContent: newCardContent});
	},

	removeLane(){
		boardActions.removeLane(this.props.id);
		analytics.trackBoardEvent('remove-lane', this.props.boardId);
	},

	render(){

		var getCards = ()=>{
			return this.props.cards.map((card, index) => {
				return (
					     <Card key={card.id} card={card} color={this.state.color}
							onLike={
								() => {
								this.onLike(card);
								}}
								removeCard={
									() => {
									this.removeCard(card);
								}}
								/>
						);
			});
		};

		return (
			<Paper className="lane" zDepth={1}>
				<div className="title">{this.props.title}</div>
				{ this.state.user.email === this.props.createdBy ?
				<IconButton className="remove-lane" tooltip="Remove this lane" onTouchTap={this.removeLane}>
					<FontIcon className="material-icons" color={"lightgray"} >clear</FontIcon>
				</IconButton>
				: <div/>
				}

				<div style={{clear: "both"}}>
						{getCards()}
					<TextField hintText="Enter card content" className="new-card-input" value={this.state.newCardContent} onChange={this.newCardContentChanged} floatingLabelText="Card content" multiLine={true} style={{width: "240px"}}/>

					<span className="add-card-btn" >
						<FloatingActionButton className="add-card" tooltip="Add card" onTouchTap={this.addNewCard} mini={true} disabled={this.state.isAddDisabled}>
						  <FontIcon className="material-icons">add</FontIcon>
						</FloatingActionButton>
						</span>
				</div>

		</Paper>);
	}
});

module.exports = Lane;
