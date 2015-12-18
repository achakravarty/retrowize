'use strict'
var _ = require('lodash');
var Board = require('../models/board');
var ObjectId = require('mongoose').Types.ObjectId;

class BoardService {

	* getBoard(boardId) {
		return yield Board.findById(boardId).exec();
	}

	* getOwnedBoards(owner) {
		return yield Board.find({ 'owner': owner }, 'name owner members').exec();
	}

	* createBoard(board) {
		var doc = Board(board);
		return yield doc.save();
	};

	* deleteLane(boardId, laneId) {
    var board = yield this.getBoard(boardId);
    var laneIndex = _.findIndex(board.lanes, {id: laneId});
    board.lanes.splice(laneIndex,1);
    return yield board.save();
	};

	* addLane(boardId, lane) {
		var board = yield this.getBoard(boardId);
		board.lanes.push(lane);
		return yield board.save();
	};

  * addCard(boardId, laneId, card) {
    var board = yield this.getBoard(boardId);
    var lane = _.find(board.lanes, {id: laneId});
    lane.cards.push(card);
  	return yield board.save();
	};

	* deleteCard(boardId, laneId, cardId) {
    var board = yield this.getBoard(boardId);
    var lane = _.find(board.lanes, {id: laneId});
    var cardIndex = _.findIndex(lane.cards, {id: cardId});
    lane.cards.splice(cardIndex, 1);
  	return yield board.save();
	};

  * voteCard(boardId, laneId, cardId, voter) {
    var board = yield this.getBoard(boardId);
    var lane = _.find(board.lanes, {id: laneId});
    var card = _.find(lane.cards, {id: cardId});
    if(!card.votes ){
      card.votes = []
    }
    if(!_.includes(card.votes,voter)){
      card.votes.push(voter);
    }
    return yield board.save();
  };

}

module.exports = new BoardService();
