'use strict'

import React from 'react';
import Lane from './lane.jsx';

import AddLane from './add-lane.jsx';

import boardStore from './board-store';

var Board = React.createClass({

	getInitialState(){
		return {
			lanes : []
		};
	},

	componentWillMount: function() {
		this.updateLanes();
		boardStore.addChangeListener(this.updateLanes);
	},

	componentWillUnmount: function() {
		boardStore.removeChangeListener(this.updateLanes);
	},

	updateLanes(){
		this.setState({lanes: boardStore.getLanes()});
	},

	render(){
		var getLanes = () => {
		return this.state.lanes.map((lane, index) => {
				return (<div key={lane.id}  className="lanes">
					  		<Lane title={lane.title} id={lane.id} cards={lane.cards}></Lane>
						</div>);
			});
		}

		return (
			<div>
				{getLanes()}
				<AddLane/>
			</div>
		)
	 }
})

module.exports = Board;
