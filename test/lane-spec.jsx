jest.dontMock('../public/js/card.jsx');
jest.dontMock('../public/js/lane.jsx');
jest.dontMock('react-tap-event-plugin');
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

var user = {
	email: 'test@test.com'
};

jest.mock('../public/js/user-service',()=>{
	return {
		getUser: function(){
			return {
				then: function(callback){
					callback(user);
				}
			};
		}
	};
});

jest.mock('../public/js/board-store', ()=>{
	return {
		getUser: function(){return user;},
		addListener: jest.genMockFn(),
		removeListener: jest.genMockFn()
	};
});

import React from 'react';
import TestUtils from 'react-addons-test-utils';


let userService,boardStore,Lane,Card, BoardActions;

describe('Lane', () => {

	beforeEach(() => {
		userService = require('../public/js/user-service');
		boardStore = require('../public/js/board-store');
		BoardActions = require('../public/js/board-actions');

		Lane = require('../public/js/lane.jsx');
		Card = require('../public/js/card.jsx');
	});

	it('should show lane title', () => {

			var cards = [];
			let lane = TestUtils.renderIntoDocument(
				<Lane title="My Lane" id={1} cards={cards}/>
			);

			let title = TestUtils.findRenderedDOMComponentWithClass(lane,'title');

			expect(title.textContent).toBe('My Lane');
	});

	it('should initially have no cards', () => {

			let cards = [];
			let lane = TestUtils.renderIntoDocument(
				<Lane id={1} cards={cards}/>
			);

			let cardsComponents = TestUtils.scryRenderedComponentsWithType(lane, Card);

			expect(cardsComponents.length).toBe(0);
	});

	it('should add new card', () => {

			let onLaneUpdated = jest.genMockFunction();
			let cards = [];
			let lane = TestUtils.renderIntoDocument(
				<Lane id={1} cards={cards} onLaneUpdated={onLaneUpdated}/>
			);
			lane.setState({isAddDisabled: false});

			let cardsComponents = TestUtils.scryRenderedComponentsWithType(lane, Card);

			expect(cardsComponents.length).toBe(0);

			let newCardContent = TestUtils.findRenderedDOMComponentWithClass(lane, 'new-card-input');
			newCardContent.value = 'New Card';
			TestUtils.Simulate.change(newCardContent);

			let createCardBtn = TestUtils.findRenderedDOMComponentWithClass(lane, 'add-card');
			TestUtils.Simulate.click(createCardBtn);

			expect(BoardActions.addCard.mock.calls.length).toBe(1);
	});

});
