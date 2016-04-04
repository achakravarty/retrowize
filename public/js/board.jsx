'use strict';

import React from 'react';
import Lane from './lane.jsx';
import AddLane from './add-lane.jsx';
import boardStore from './board-store';
import boardActions from './board-actions';
import BoardEvents from './board-events';
import Header from './header.jsx';

var Board = React.createClass({

	getInitialState(){
		return {
			lanes : this.props.lanes || boardStore.getLanes() || [],
			boardId: this.props.boardId || (this.props.params && this.props.params.boardId) || '',
		};
	},

	componentWillMount() {
		boardStore.addListener(BoardEvents.CHANGE_EVENT ,this.updateLanes);
		boardStore.addListener(BoardEvents.BOARD_LOADED ,this.updateLanes);
	},

	componentDidMount(){
		if(this.state.boardId && this.state.lanes.length === 0){
			boardActions.fetchLanes(this.state.boardId);
		}
	},

	componentWillUnmount() {
		boardStore.removeListener(BoardEvents.CHANGE_EVENT, this.updateLanes);
		boardStore.removeListener(BoardEvents.BOARD_LOADED, this.updateLanes);
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
				<Header boardName={this.state.boardId}/>
				<div style={{padding:'10px'}}>
					{getLanes()}
					<AddLane boardId={this.state.boardId}/>
				</div>
			</div>
		);
	 }
});

module.exports = Board;
