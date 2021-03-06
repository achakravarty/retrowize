'use strict';
var _ = require('lodash');
var Board = require('../models/board');
var ObjectId = require('mongoose').Types.ObjectId;

class BoardService {

	* getBoard(boardId) {
		return yield Board.findOne({'id': boardId, 'active': true}).exec();
	}

	* getOwnedBoards(owner) {
		return yield Board.find({ 'owner': owner, 'active': true}, {id: 1, _id: 1}).exec();
	}

	* archiveBoard(_id){
		let board = yield Board.findById(_id);
		board.active = false;
		return yield board.save();
	}

	* createBoard(board) {
		var doc = Board(board);
		return yield doc.save();
	}

	* deleteLane(boardId, laneId) {
    var board = yield this.getBoard(boardId);
    var laneIndex = _.findIndex(board.lanes, {id: laneId});
    board.lanes.splice(laneIndex,1);
    return yield board.save();
	}

	* addLane(boardId, lane) {
		var board = yield this.getBoard(boardId);
		board.lanes.push(lane);
		return yield board.save();
	}

  * addCard(boardId, laneId, card) {
    var board = yield this.getBoard(boardId);
    var lane = _.find(board.lanes, {id: laneId});
    lane.cards.push(card);
  	return yield board.save();
	}

	* deleteCard(boardId, laneId, cardId) {
    var board = yield this.getBoard(boardId);
    var lane = _.find(board.lanes, {id: laneId});
    var cardIndex = _.findIndex(lane.cards, {id: cardId});
    lane.cards.splice(cardIndex, 1);
  	return yield board.save();
	}

	findCard(board, laneId, cardId){
		var lane = _.find(board.lanes, {id: laneId});
		if(lane){
			return _.find(lane.cards, {id: cardId});
		}	else {
			return undefined;
		}
	}

  * voteCard(boardId, laneId, cardId, voter) {
    var board = yield this.getBoard(boardId);
		var card = this.findCard(board, laneId, cardId);
		if(!card){
			return;
		}

    if(!card.votes ){
      card.votes = [];
    }
    if(!_.includes(card.votes,voter)){
      card.votes.push(voter);
    }
    return yield board.save();
  }

	* removeVote(boardId, laneId, cardId, voter) {
		var board = yield this.getBoard(boardId);
		var card = this.findCard(board, laneId, cardId);
		if(!card){
			return;
		}

		if(!card.votes ){
      card.votes = [];
    }
    if(_.includes(card.votes,voter)){
			_.remove(card.votes,(v)=>{
				return v === voter;
			});
    }
    return yield board.save();
  }

}

module.exports = new BoardService();
