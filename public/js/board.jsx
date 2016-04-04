'use strict';

import React from 'react';
import Lane from './lane.jsx';
import AddLane from './add-lane.jsx';
import boardStore from './board-store';
import BoardEvents from './board-events';
import Header from './header.jsx';

var Board = React.createClass({

	getInitialState(){
		return {
			lanes : boardStore.getLanes() || [],
			boardId: '',
		};
	},

	componentWillMount: function() {
		boardStore.addListener(BoardEvents.CHANGE_EVENT ,this.updateLanes);
	},

	componentWillUnmount: function() {
		boardStore.removeListener(BoardEvents.CHANGE_EVENT, this.updateLanes);
	},

	updateLanes(){
		this.setState({lanes: boardStore.getLanes()});
	},

	render(){
		var getLanes = () => {
		return this.state.lanes.map((lane, index) => {
				return (
					<div key={lane.id}  className="lanes">
					  		<Lane title={lane.title} id={lane.id} cards={lane.cards} boardId={this.props.boardId}></Lane>
						</div>
					);
			});
		};

		return (
			<div>
				<Header boardName={this.props.boardId}/>
				<div style={{padding:'10px'}}>
					{getLanes()}
					<AddLane boardId={this.props.boardId}/>
				</div>
			</div>
		);
	 }
});

module.exports = Board;
