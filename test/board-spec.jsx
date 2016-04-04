jest.dontMock('../public/js/board.jsx');
jest.dontMock('../public/js/lane.jsx');
jest.dontMock('material-ui/lib/raised-button');
jest.dontMock('material-ui/lib/text-field');
jest.dontMock('react-tap-event-plugin');
jest.dontMock('../public/js/board-store');
jest.dontMock('../public/js/app-dispatcher');
jest.dontMock('../public/js/board-actions');
jest.dontMock('../public/js/add-lane.jsx');

import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
var Socket = require('socket.io-client');
Socket.connect = function(){
	var store = {};
	var em = function(e, a) {
		store[e](a);
	};
	var on = function(e, cb) {
		store[e] = cb;
	};
	return { on: on, emit: em };
};

const injectTapEventPlugin = require('react-tap-event-plugin');
injectTapEventPlugin();

var boardService = require('../public/js/board-service');
var boardStore = require('../public/js/board-store');

const Lane = require('../public/js/lane.jsx');
const boardActions = require('../public/js/board-actions');
const RaisedButton = require('material-ui/lib/raised-button');
const TextField = require('material-ui/lib/text-field');
const Board = require('../public/js/board.jsx');
const AddLane = require('../public/js/add-lane.jsx');


describe('Board', () => {

	beforeEach(()=>{
		boardStore._boardId = "test-board";
		boardStore._lanes = [{title: 'Test Lane', cards:[], id: 0}];
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

			let newLaneTitle = TestUtils.findRenderedComponentWithType(addLane, TextField);
			newLaneTitle.setValue("New Test Lane");

			let addLaneBtn = TestUtils.findRenderedDOMComponentWithClass(board, 'add-lane-btn');
			TestUtils.Simulate.touchTap(addLaneBtn);

			expect(board.state.lanes.length).toBe(2);
			expect(board.state.lanes[1].title).toBe("New Test Lane");
	});

	it('should set lane titles', () => {
			let board = TestUtils.renderIntoDocument(
				<Board/>
			);
			let lanes = TestUtils.scryRenderedComponentsWithType(board, Lane);

			expect(lanes[0].props.title).toBe('Test Lane');

	});

});
