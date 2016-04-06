jest.dontMock('../public/js/board.jsx');
jest.dontMock('../public/js/lane.jsx');
jest.dontMock('../public/js/app-dispatcher');
jest.dontMock('../public/js/add-lane.jsx');
jest.dontMock('./mock-icon-button.jsx');
jest.dontMock('./mock-text-field.jsx');

jest.mock('material-ui/lib/icon-button', () => {
	return require('./mock-icon-button.jsx');
});

jest.mock('material-ui/lib/raised-button',() => {
	return require('./mock-icon-button.jsx');
});

jest.mock('material-ui/lib/floating-action-button',() => {
	return require('./mock-icon-button.jsx');
});

jest.mock('material-ui/lib/text-field',() => {
	return require('./mock-text-field.jsx');
});

import React from 'react';
import TestUtils from 'react-addons-test-utils';

jest.mock('../public/js/board-store', ()=>{
	return require('./mock-board-store');
});

const RaisedButton = require('material-ui/lib/raised-button');
const TextField = require('material-ui/lib/text-field');

let boardService, boardStore, userService, Lane, AddLane, Board, boardActions;

describe('Board', () => {

	beforeEach(()=>{
		userService = require('../public/js/user-service');

		var Socket = require('socket.io-client');

		boardService = require('../public/js/board-service');
	  boardStore = require('../public/js/board-store');
		boardActions = require('../public/js/board-actions');

		Lane = require('../public/js/lane.jsx');
		AddLane = require('../public/js/add-lane.jsx');
		Board = require('../public/js/board.jsx');

		boardStore._boardId = "test-board";
		let lanes = [{title: 'Test Lane', cards:[], id: 0}];
		boardStore.getLanes.mockReturnValue(lanes);
		boardStore.getUser.mockReturnValue({
			email: 'test@test.com'
		});
	});

	it('should fetch lanes from BoardStore', () => {
			let board = TestUtils.renderIntoDocument(
				<Board/>
			);
			expect(board.state.lanes.length).toBe(1);
	});

	it('should add new lane', () => {

		  var boardResponse =  {
					then: function(callback){
						callback({
							lanes :[
								{title: 'Test Lane', cards:[], id: 0},
								{title: 'New Test Lane', cards:[], id: 1}]
						});
					}
			};

			boardService.addLane.mockReturnValue(boardResponse);
			boardService.getBoard.mockReturnValue(boardResponse);

			let board = TestUtils.renderIntoDocument(
				<Board/>
			);

			let addLane = TestUtils.findRenderedComponentWithType(board, AddLane);
			addLane.setState({isAddDisabled: false});

			let newLaneTitle = TestUtils.findRenderedDOMComponentWithClass(addLane, 'new-lane-title');
			newLaneTitle.value = "New Test Lane";
			TestUtils.Simulate.change(newLaneTitle);

			let addLaneBtn = TestUtils.findRenderedDOMComponentWithClass(board, 'add-lane-btn');
			TestUtils.Simulate.click(addLaneBtn);

			expect(boardActions.addLane.mock.calls.length).toBe(1);
	});

	it('should set lane titles', () => {
			let board = TestUtils.renderIntoDocument(
				<Board/>
			);
			let lanes = TestUtils.scryRenderedComponentsWithType(board, Lane);

			expect(lanes[0].props.title).toBe('Test Lane');

	});

});
