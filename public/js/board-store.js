import Events from 'events';
import _ from 'lodash';
import boardService from './board-service';
import BoardEvents from './board-events';
import Socket from 'socket.io-client';
import userService from './user-service';

class BoardStore extends Events.EventEmitter {

  constructor(){
    super();
    this._lanes = [];
    this._boardId = '';
    this._user = '';
    console.log(userService);
    userService.getUser().then((resp) => {
      if(resp.email){
        this._user = resp;
        this.emit(BoardEvents.USER_UPDATED);
      }
    });

    this.socket = Socket.connect();
    console.log(this.socket);
    this.socket.on(BoardEvents.CHANGE_EVENT, (boardId)=>{
      if(this.getBoardId() === boardId){
        boardService.getBoard(boardId)
        .then((resp) => {
          if(resp.lanes){
            if(!_.eq(this._lanes,resp.lanes)){
              this._lanes = resp.lanes;
              this.emit(BoardEvents.CHANGE_EVENT);
            }
          }
        });
      }
    });
  }

  createBoard(boardId){
    boardService.getBoard(boardId)
    .then((resp) => {
      if(resp.lanes){
        this.emit(BoardEvents.BOARD_ALREADY_EXISTS);
      } else {
        boardService.createBoard(boardId)
        .then((resp) => {
          if(resp.lanes){
            this._lanes = resp.lanes;
            this._boardId = resp.id;
            this.emit(BoardEvents.BOARD_LOADED);
          }
        });
      }
    });
  }

  fetchLanes(boardId){
    boardService.getBoard(boardId)
    .then((resp) => {
      if(resp.lanes){
        this._lanes = resp.lanes;
        this._boardId = resp.id;
        this.emit(BoardEvents.BOARD_LOADED);
      } else {
        this.emit(BoardEvents.BOARD_NOT_FOUND);
      }
    });
  }

  getBoardId(){
    return this._boardId;
  }

  getUser(){
    return this._user;
  }

  getLanes() {
		return _.cloneDeep(this._lanes);
	}

	getBoard() {
		return _.cloneDeep(this._lanes);
	}

	addLane(lane) {
    boardService.addLane(this.getBoardId(), lane.title)
    .then((resp) => {
      this._lanes = resp.lanes;
      this.emitChange();
    });
  }

  updateLaneTitle(laneId, title){
    boardService.updateLaneTitle(this.getBoardId(), laneId, title)
    .then((resp) => {
      this._lanes = resp.lanes;
      this.emitChange();
    });
  }

	removeLane(laneId){
    boardService.removeLane(this.getBoardId(), laneId)
    .then((resp) => {
      this._lanes = resp.lanes;
      this.emitChange();
    });
	}

	addCard(card, laneId) {
    boardService.addCard(this.getBoardId(), laneId, card.content)
    .then((resp) => {
      this._lanes = resp.lanes;
      this.emitChange();
    });
	}

  updateCardContent(laneId, cardId, content){
    boardService.updateCardContent(this.getBoardId(), laneId, cardId, content)
    .then((resp) => {
      this._lanes = resp.lanes;
      this.emitChange();
    });
  }

	voteCard(card, laneId) {
    boardService.voteCard(this.getBoardId(), laneId, card.id)
    .then((resp) => {
      this._lanes = resp.lanes;
      this.emitChange();
    });
	}

	removeCard(card, laneId) {
    boardService.removeCard(this.getBoardId(), laneId, card.id)
    .then((resp) => {
      this._lanes = resp.lanes;
      this.emitChange();
    });
	}

  emitChange() {
    this.emit(BoardEvents.CHANGE_EVENT);
    this.socket.emit(BoardEvents.CHANGE_EVENT, this.getBoardId());
  }

}

module.exports = new BoardStore();
