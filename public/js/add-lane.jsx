'use strict';

import React from 'react';
import boardActions from './board-actions';
import analytics from './analytics';
import RaisedButton from 'material-ui/lib/raised-button';
import TextField from 'material-ui/lib/text-field';

var AddLane = React.createClass({

  getInitialState(){
    return {
      isAddDisabled: true
    };
  },

  addLane(){
    boardActions.addLane({title: this.state.newLaneTitle});
    analytics.trackBoardEvent('add-lane', this.props.boardId);
    this.setState({isAddDisabled: true, newLaneTitle: ''});
  },

  newLaneTitleChanged(event){
    let newLaneTitle =  event.target.value;
    this.setState({isAddDisabled: newLaneTitle.length === 0, newLaneTitle: newLaneTitle});
  },

  render(){
    return (
      <div className="new-lane">
        <TextField className="new-lane-title" onChange={this.newLaneTitleChanged}
            hintText="Enter lane title"
            floatingLabelText="Lane title"
            value={this.state.newLaneTitle}
           />
        <div>
            <RaisedButton disabled={this.state.isAddDisabled} className="add-lane-btn" label="Add New Lane" onTouchTap={this.addLane} primary={true}/>
        </div>
    </div>
    );
  }
});

module.exports = AddLane;
