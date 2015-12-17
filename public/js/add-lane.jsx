'use strict'

import React from 'react';
import boardActions from './board-actions';

import RaisedButton from 'material-ui/lib/raised-button';
import TextField from 'material-ui/lib/text-field';

var AddLane = React.createClass({

  addLane(){
    boardActions.addLane({title: this.refs.laneTitle.getValue()});
    this.refs.laneTitle.setValue("");
  },

  render(){
    return (
      <div className="new-lane">
        <TextField className="new-lane-title" hintText="Lane title" ref="laneTitle" />
        <RaisedButton className="add-lane-btn" label="Add New Lane" onTouchTap={this.addLane} primary={true}/>
      </div>
    );
  }
});

module.exports = AddLane;
