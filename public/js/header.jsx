import React from 'react';
import UserInfo from './user-info.jsx';

var Header = React.createClass({

  render(){
    return (
      <div className="header">
        <span className="logo">Retrowize</span>
        <div className="user-info">
          <UserInfo/>
        </div>
        <div className="board-name">{this.props.boardName}</div>
      </div>
    );
  }

});

module.exports = Header;
