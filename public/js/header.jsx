import React from 'react'

var Header = React.createClass({

  render(){
    return (
      <div className="header">
        <span className="logo">Retrowize</span>
        <div className="board-name">{this.props.boardName}</div>
      </div>
    )
  }

})

module.exports = Header
