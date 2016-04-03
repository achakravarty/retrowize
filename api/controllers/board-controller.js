'use strict';
var boardService = require('../services/board-service');
var hashcode = require('hashcode').hashCode;
var ObjectId = require('mongoose').Types.ObjectId;

class BoardController {

	* getBoard(next) {
		this.body = yield boardService.getBoard(this.params.boardId);
	}

	* createBoard(next) {
		console.log('creating board');
console.log(this.user);
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
			cards: []
		};
		this.body = yield boardService.addLane(this.params.boardId, lane);
		this.status = 201;
	}


	* deleteLane(next) {
		  this.body = yield boardService.deleteLane(this.params.boardId, this.params.laneId);
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
		this.body = yield boardService.deleteCard(this.params.boardId, this.params.laneId, this.params.cardId);
	}


	* voteCard(next) {
		let voter = this.passport.user.email;
		this.body = yield boardService.voteCard(this.params.boardId, this.params.laneId, this.params.cardId, voter);
	}
}

module.exports = new BoardController();
