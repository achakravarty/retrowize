'use strict';

import React from 'react';
import Paper from 'material-ui/lib/paper';
import Badge from 'material-ui/lib/badge';
import IconButton from 'material-ui/lib/icon-button';
import FontIcon from 'material-ui/lib/font-icon';
import boardStore from './board-store';
import BoardEvents from './board-events';
import FloatingActionButton from 'material-ui/lib/floating-action-button';
import RaisedButton from 'material-ui/lib/raised-button';
import TextField from 'material-ui/lib/text-field';
import boardActions from './board-actions';
import Analytics from './analytics.js';

var Card = React.createClass( {

	getInitialState(){
		return {
			user: boardStore.getUser(),
			isEditDisabled: false
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

	enableEdit(){
		if(this.props.card.createdBy === this.state.user.email){
			this.setState({ cardContent: this.props.card.content, inEditMode: true});
		}
	},

	cardContentChanged(event){
		this.setState({ cardContent: event.target.value, isEditDisabled: event.target.value.length === 0});
	},

	editCard(){
		analytics.trackBoardEvent('edit-card-content', this.props.boardId);
		boardActions.updateCardContent(this.props.laneId, this.props.card.id, this.state.cardContent);
		this.setState({inEditMode: false});
	},

	render(){
		return (
			<Paper zDepth={2} className="card" style={{backgroundColor: this.props.color}}>
				{ this.state.user.email === this.props.card.createdBy ?
					<div className="remove-card">
						<IconButton tooltip="Remove this card" onTouchTap={this.props.removeCard}>
							<FontIcon className="material-icons trash-icon" color={"gray"} >clear</FontIcon>
						</IconButton>
					</div>
					: <div/>
				}
				{ this.state.inEditMode ?
					<div style={{clear: "both"}}>
						<TextField hintText="Enter card content" className="new-card-input" value={this.state.cardContent} onChange={this.cardContentChanged} multiLine={true} rows={4} style={{width: "260px"}}/>
						<RaisedButton disabled={this.state.isEditDisabled} className="edit-card-btn" label="Done" onTouchTap={this.editCard} secondary={true}/>
					</div>

					: <div className="card-content" onMouseDown={this.enableEdit}>{this.props.card.content}</div>
				}
					 <div className="like-btn" >
						  <IconButton tooltip="Vote this card" onTouchTap={this.props.onLike}>
								<FontIcon className="material-icons" color= {this.props.card.votes.indexOf(this.state.user.email) >= 0? "red": "pink"}>favorite</FontIcon>
						  </IconButton>
							<div className="votes">
								{this.props.card.votes.length}
							</div>
				 </div>
				</Paper>
			);
	}
});

module.exports = Card;
