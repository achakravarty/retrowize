'use strict';

import React from 'react';
import RaisedButton from 'material-ui/lib/raised-button';
import TextField from 'material-ui/lib/text-field';
import boardActions from './board-actions';
import BoardEvents from './board-events';
import boardStore from './board-store';
import analytics from './analytics';
import Board from './board.jsx';

var Main = React.createClass({

  getInitialState(){
    return {
      showBoard: false,
      boardId: '',
      lanes: [],
      boardNameEmpty: false,
      boardNotFound: false,
      boardAlreadyExists: false
    };
  },

  componentWillMount() {
		boardStore.addListener(BoardEvents.BOARD_LOADED, this.loadBoard);
    boardStore.addListener(BoardEvents.BOARD_NOT_FOUND, this._boardNotFound);
    boardStore.addListener(BoardEvents.BOARD_ALREADY_EXISTS, this._boardAlreadyExists);
	},

	componentWillUnmount() {
		boardStore.removeListener(BoardEvents.BOARD_LOADED, this.loadBoard);
    boardStore.removeListener(BoardEvents.BOARD_NOT_FOUND, this._boardNotFound);
    boardStore.removeListener(BoardEvents.BOARD_ALREADY_EXISTS, this._boardAlreadyExists);
	},

  _boardNotFound(){
    this.setState({boardNotFound:true});
  },

  _boardAlreadyExists(){
    this.setState({boardAlreadyExists: true});
  },

  createBoard(){
    let boardId = this.refs.boardId.getValue();
    if(boardId.length === 0){
      this.setState({boardNameEmpty: true});
      return;
    }
    analytics.trackBoardEvent('create', boardId);
    boardActions.createBoard(boardId);
  },

  loadBoard(){
    let boardId = boardStore.getBoardId();
    let lanes = boardStore.getLanes();
    this.setState({showBoard: true, boardId: boardId, lanes: lanes});
  },

  _getBoardId(){
    return this.refs.boardId.getValue();
  },

  openBoard(){
    let boardId = this._getBoardId();
    if(boardId.length === 0){
      this.setState({boardNameEmpty: true});
      return;
    }
    analytics.trackBoardEvent('open', boardId);
    boardActions.fetchLanes(boardId);
  },

  _onBoardIdChange(){
    let boardId = this._getBoardId();
    if(boardId.length === 0){
      this.setState({boardNotFound: false});
      this.setState({boardAlreadyExists: false});
    }else{
      this.setState({boardNameEmpty: false});
    }
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
          {this.state.boardNotFound? <div className="error message">Oops! Could not find board.</div> : <div></div>}
          {this.state.boardNameEmpty? <div className="error message">Please enter board name.</div> : <div></div>}
          {this.state.boardAlreadyExists? <div className="error message">Board with this name already exists! Please choose another name.</div> : <div></div>}
          <TextField className="new-lane-title" hintText="Enter board name" ref="boardId" onChange={this._onBoardIdChange}/>
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
