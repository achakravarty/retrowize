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

const injectTapEventPlugin = require('react-tap-event-plugin');
injectTapEventPlugin();

const Lane = require('../public/js/lane.jsx');
const boardStore = require('../public/js/board-store');
const boardActions = require('../public/js/board-actions');
const RaisedButton = require('material-ui/lib/raised-button');
const TextField = require('material-ui/lib/text-field');
const Board = require('../public/js/board.jsx');
const AddLane = require('../public/js/add-lane.jsx');


describe('Board', () => {

	beforeEach(()=>{
		boardStore._lanes = [{title: 'Test Lane', cards:[], id: 0}];
	})

	it('should fetch lanes from BoardStore', () => {
			let board = TestUtils.renderIntoDocument(
				<Board/>
			);
			expect(board.state.lanes.length).toBe(1);
	})

	it('should add new lane', () => {
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
	})

	it('should set lane titles', () => {
			let board = TestUtils.renderIntoDocument(
				<Board/>
			);
			let lanes = TestUtils.scryRenderedComponentsWithType(board, Lane);

			expect(lanes[0].props.title).toBe('Test Lane');

	})


})
