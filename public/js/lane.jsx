'use strict'

import React from 'react'
import Card from './card.jsx'
import TextField from 'material-ui/lib/text-field'
import Paper from 'material-ui/lib/paper';
import IconButton from 'material-ui/lib/icon-button';
import FloatingActionButton from 'material-ui/lib/floating-action-button';
import FontIcon from 'material-ui/lib/font-icon';
import boardActions from './board-actions';

var Lane = React.createClass( {

	getInitialState(){
		return {
			color: "lightyellow",
			isAddDisabled: true
		}
	},

	addNewCard(){
		let card = {
			content : this.refs.newCardContent.getValue(),
			likes: 0
		}
		boardActions.addCard(card,this.props.id);
		this.refs.newCardContent.setValue('');
		this.setState({isAddDisabled: true});
	},

	onLike(card) {
		card.likes = card.likes + 1;
		boardActions.voteCard(card, this.props.id);
	},

	removeCard(card) {
		boardActions.removeCard(card, this.props.id);
	},

	canEnableAddButton(){
		var disable =  this.refs.newCardContent.getValue().length === 0;
		this.setState({isAddDisabled: disable})
	},

	removeLane(){
		boardActions.removeLane(this.props.id);
	},

	render(){

		var getCards = ()=>{
			return this.props.cards.map((card, index) => {
				return (
					     <Card key={card.id} content={card.content} likes={card.votes.length} color={this.state.color}
							onLike={
								() => {
								this.onLike(card)
								}}
								removeCard={
									() => {
									this.removeCard(card)
								}}
								/>
						);
			});
		}

		return (
			<Paper className="lane" zDepth={1}>
				<div className="title">{this.props.title}</div>
				<IconButton className="remove-lane" tooltip="Remove this lane" onTouchTap={this.removeLane}>
					<FontIcon className="material-icons" color={"lightgray"} >clear</FontIcon>
				</IconButton>

				<div style={{clear: "both"}}>
						{getCards()}
					<TextField hintText="Enter card content" onChange={this.canEnableAddButton} floatingLabelText="Card content" multiLine={true} ref="newCardContent" style={{width: "240px"}}/>

					<span className="add-card-btn" >
						<FloatingActionButton className="add-card" tooltip="Add card" onTouchTap={this.addNewCard} mini={true} disabled={this.state.isAddDisabled}>
						  <FontIcon className="material-icons">add</FontIcon>
						</FloatingActionButton>
						</span>
				</div>

		</Paper>);
	}
})

module.exports = Lane
