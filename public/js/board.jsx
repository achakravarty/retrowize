'use strict'

import React from 'react';
import Lane from './lane.jsx';
import RaisedButton from 'material-ui/lib/raised-button';
import BoardStore from './board-store';
import boardActions from './board-actions';

var Board = React.createClass({

	getInitialState(){
		return {
			lanes : []
		};
	},

	componentDidMount: function() {
		this.updateLanes();
		BoardStore.addChangeListener(this.updateLanes);
	},

	componentWillUnmount: function() {
		BoardStore.removeChangeListener(this.updateLanes);
	},

	updateLanes(){
		this.setState({lanes: BoardStore.getLanes()});
	},

	addLane(){
		boardActions.addLane({title: 'New Lane'});
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
				<div>
					<RaisedButton className="add-lane-btn" label="Add New Lane" onTouchTap={this.addLane} primary={true}/>
				</div>
			</div>)
	 }
})

module.exports = Board;
