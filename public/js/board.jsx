'use strict'

import React from 'react';
import Lane from './lane.jsx';
import AddLane from './add-lane.jsx';
import boardStore from './board-store';
import BoardEvents from './board-events';

var Board = React.createClass({

	getInitialState(){
		return {
			lanes : [],
			boardId: '',
		};
	},

	componentWillMount: function() {
		this.updateLanes();
		boardStore.addListener(BoardEvents.CHANGE_EVENT ,this.updateLanes);
	},

	componentWillUnmount: function() {
		boardStore.removeListener(BoardEvents.CHANGE_EVENT, this.updateLanes);
	},

	updateLanes(){
		console.log('Updating lanes');
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
		}

		return (
			<div>
				<div className="board-name" style={{fontSize:"18px", padding: "5px"}}>{this.props.boardId}</div>
				{getLanes()}
				<AddLane boardId={this.props.boardId}/>
			</div>
		)
	 }
})

module.exports = Board;
