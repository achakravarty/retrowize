'use strict'

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
    boardActions.addLane({title: this.refs.laneTitle.getValue()});
    analytics.trackBoardEvent('add-lane', this.props.boardId);
    this.refs.laneTitle.setValue("");
    this.setState({isAddDisabled: true});
  },

  canEnableAddButton(){
    this.setState({isAddDisabled: this.refs.laneTitle.getValue().length === 0})
  },

  render(){
    return (
      <div className="new-lane">
        <TextField className="new-lane-title" onChange={this.canEnableAddButton}
            hintText="Enter lane title"
            floatingLabelText="Lane title"
            ref="laneTitle" />
        <div>
            <RaisedButton disabled={this.state.isAddDisabled} className="add-lane-btn" label="Add New Lane" onTouchTap={this.addLane} primary={true}/>
        </div>
    </div>
    );
  }
});

module.exports = AddLane;
