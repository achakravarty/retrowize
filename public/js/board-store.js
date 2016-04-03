import Events from 'events';
import _ from 'lodash';
import boardService from './board-service';
import BoardEvents from './board-events';
import Socket from 'socket.io-client';

class BoardStore extends Events.EventEmitter {

  constructor(){
    super();
    this._lanes = [];
    this._boardId = '';
    this.socket = Socket();
    this.socket.on(BoardEvents.CHANGE_EVENT, (boardId)=>{
      if(this.getBoardId() === boardId){
        boardService.getBoard(boardId)
        .then((resp) => {
          if(resp.lanes){
            this._lanes = resp.lanes;
            this.emit(BoardEvents.CHANGE_EVENT);
            console.log('Board changed');
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
      }else{
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
      }else{
        this.emit(BoardEvents.BOARD_NOT_FOUND);
      }
    });
  }

  getBoardId(){
    return this._boardId;
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
    this.socket.emit(BoardEvents.CHANGE_EVENT, this.getBoardId());
  }

  addListener(boardEvent,callback) {
    this.on(boardEvent, callback);
  }

  removeListener(boardEvent,callback) {
    this.removeListener(boardEvent, callback);
  }
}

module.exports = new BoardStore();
