'use strict';

import React from 'react';
import TextField from 'material-ui/lib/text-field';
import Paper from 'material-ui/lib/paper';
import IconButton from 'material-ui/lib/icon-button';
import FloatingActionButton from 'material-ui/lib/floating-action-button';
import FontIcon from 'material-ui/lib/font-icon';
import boardActions from './board-actions';
import boardStore from './board-store';
import BoardEvents from './board-events';
import analytics from './analytics';
import UserInfo from './user-info.jsx';

var Sidebar = React.createClass({

  getInitialState(){
    return {
      collapsed: false
    };
  },

  render(){
    return (
      <div>

      </div>
    );
  }

});

module.exports = Sidebar;
