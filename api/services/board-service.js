'use strict'
var _ = require('lodash');
var Board = require('../models/board');

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
    if(board){
			var laneIndex = _.findIndex(board.lanes, { id : laneId});
			board.lanes.splice(laneIndex);
      console.log(" lanes = "+ laneIndex);
			return yield board.save();
		}else{
			return null;
		}
	};

	* getBoardByName(owner, teamName) {
		var teams = yield this.getOwnedBoards(owner);
		return _.find(teams, (team) => {
			return team.name === teamName;
		});
	}

	* addLane(boardId, lane) {
		var board = yield this.getBoard(boardId);
		board.lanes.push(lane);
		return yield board.save();
	};

	* removeMember(owner, teamName, memberToRemove) {
		var team = yield this.getBoardByName(owner, teamName);
		if (_.includes(team.members, memberToRemove)) {
			team.members.pull(memberToRemove);
			return yield team.save();
		} else {
			return team;
		}
	};
}

module.exports = new BoardService();
