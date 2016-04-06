'use strict';

import React from 'react';
import Paper from 'material-ui/lib/paper';
import Badge from 'material-ui/lib/badge';
import IconButton from 'material-ui/lib/icon-button';
import FontIcon from 'material-ui/lib/font-icon';
import boardStore from './board-store';
import BoardEvents from './board-events';

var Card = React.createClass( {

	getInitialState(){
		return {
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
				   <div className="card-content">{this.props.card.content}</div>
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
