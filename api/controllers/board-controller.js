'use strict';
var boardService = require('../services/board-service');
var hashcode = require('hashcode').hashCode;
var ObjectId = require('mongoose').Types.ObjectId;
var _ = require('lodash');

var self;

class BoardController {

	constructor(){
		self = this;
	}

	* getBoard(next) {
		this.body = yield boardService.getBoard(this.params.boardId);
	}

	* getBoards(next) {
		this.body = yield boardService.getOwnedBoards(this.passport.user.email);
	}

	* createBoard(next) {
		let board = {
			owner: this.passport.user.email,
			id: this.request.body.name,
			lanes: []
		};
		var existingBoard = yield boardService.getBoard(board.id);
		if(existingBoard){
			this.body = { error: `Board with name ${board.id} already exisits. Please choose another name.`};
			this.status = 400;
			return;
		}
		this.body = yield boardService.createBoard(board);
		this.status = 201;
	}

	* addLane(next) {
		let title = this.request.body.title;
		let id = new ObjectId();
		let lane = {
			id: id.toString(),
			title: title,
			createdBy: this.passport.user.email,
			cards: []
		};
		this.body = yield boardService.addLane(this.params.boardId, lane);
		this.status = 201;
	}

	* getLane(boardId, laneId){
		var board = yield boardService.getBoard(boardId);
		if(board){
			return _.find(board.lanes, {id: laneId});
		} else {
			return undefined;
		}
	}

	* deleteLane(next) {
		let lane = yield self.getLane(this.params.boardId, this.params.laneId);
		if(lane && lane.createdBy === this.passport.user.email){
			this.body = yield boardService.deleteLane(this.params.boardId, this.params.laneId);
		} else {
			this.body = { error: "Cannot delete lanes created by other users"};
			this.status = 401;
		}
	}

	* addCard(next) {
		let content = this.request.body.content;
		let id = new ObjectId();
		let card = {
			id: id.toString(),
			content: content,
			votes: [],
			createdBy: this.passport.user.email
		};
		this.body = yield boardService.addCard(this.params.boardId, this.params.laneId, card);
	}

	* deleteCard(next) {
		let lane = yield self.getLane(this.params.boardId, this.params.laneId);
		let card = _.find(lane.cards, {id: this.params.cardId});

		if(card && card.createdBy === this.passport.user.email){
			this.body = yield boardService.deleteCard(this.params.boardId, this.params.laneId, this.params.cardId);
		} else {
			this.body = { error: "Cannot delete cards created by other users"};
			this.status = 401;
		}
	}

	* voteCard(next) {
		let voter = this.passport.user.email;
		this.body = yield boardService.voteCard(this.params.boardId, this.params.laneId, this.params.cardId, voter);
	}

	* removeVote(next) {
		let voter = this.passport.user.email;
		this.body = yield boardService.remveVote(this.params.boardId, this.params.laneId, this.params.cardId, voter);
	}
}

module.exports = new BoardController();
