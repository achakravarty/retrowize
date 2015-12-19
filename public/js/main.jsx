import React from 'react';
import RaisedButton from 'material-ui/lib/raised-button';
import TextField from 'material-ui/lib/text-field';
import boardActions from './board-actions';
import BoardEvents from './board-events';
import boardStore from './board-store';
import Board from './board.jsx';

var Main = React.createClass({

  getInitialState(){
    return {
      showBoard: false,
      boardId: '',
      lanes: [],
    };
  },

  componentWillMount: function() {
		boardStore.addListener(BoardEvents.BOARD_LOADED, this.loadBoard);
	},

	componentWillUnmount: function() {
		boardStore.removeListener(BoardEvents.BOARD_LOADED, this.loadBoard);
	},

  createBoard(){
    boardActions.createBoard(this.refs.boardId.getValue());
  },

  loadBoard(){
    let boardId = boardStore.getBoardId()
    let lanes = boardStore.getLanes()
    this.setState({showBoard: true, boardId: boardId, lanes: lanes});
  },

  openBoard(){
    boardActions.fetchLanes(this.refs.boardId.getValue());
  },

  render(){
    return (
      <div>
        { this.state.showBoard?
        <div >
          <Board boardId={this.state.boardId} lanes={this.state.lanes}/>
        </div>
        :
        <div className="container">
          <div className="logo">
              Retrowize!
          </div>
          <div className="sub-header">
              Perfect tool for retrospectives
          </div>
          <div>Open an existing board or create new one!</div>
          <TextField className="new-lane-title" hintText="Enter board name" ref="boardId" />
          <div>
          <RaisedButton className="join-board-btn"
            label="Open" onTouchTap={this.openBoard} primary={true}/>

          <RaisedButton className="create-board-btn" label="Create New Board"
            onTouchTap={this.createBoard} secondary={true}/>
          </div>
        </div>
      }
      </div>
    )
  }
});

module.exports = Main;
