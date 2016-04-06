jest.dontMock('../public/js/card.jsx');
jest.dontMock('material-ui/lib/font-icon');
jest.dontMock('material-ui/lib/paper');
jest.dontMock('./mock-icon-button.jsx');

import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';

jest.mock('material-ui/lib/icon-button', () => {
	return require('./mock-icon-button.jsx');
});

let cardDetails = {
	content: 'My card',
	createdBy: 'test@test.com',
	votes: []
};

jest.mock('../public/js/board-store', ()=>{
	return require('./mock-board-store');
});

let userService, boardStore, Card;

describe('Card', () => {

	beforeEach(()=>{
		userService = require('../public/js/user-service');
		boardStore = require('../public/js/board-store');
		boardStore.getUser.mockReturnValue({
				email: 'test@test.com'
		});
		Card = require('../public/js/card.jsx');
	});

	it('should show card content', () => {
		let card = TestUtils.renderIntoDocument(
			<Card card={cardDetails}/>
		);

		let content = TestUtils.findRenderedDOMComponentWithClass(card,'card-content');

		expect(content.textContent).toBe('My card');
	});

	it('should have zero likes', () => {
		let card = TestUtils.renderIntoDocument(
			<Card card={cardDetails}/>
		);

		expect(card.props.card.votes.length).toBe(0);
	});

	it('should be able to increment likes', () => {
		var onLike = jest.genMockFn();
		let card = TestUtils.renderIntoDocument(
			<Card card={cardDetails} onLike={onLike}/>
		);

		let likeBtn = TestUtils.findRenderedDOMComponentWithClass(card, 'like-btn');
		var btn = likeBtn.querySelectorAll("button");
		TestUtils.Simulate.click(btn[0]);

		expect(card.props.onLike).toBeCalled();
	});

	it('should be able to delete card', () => {
		var onRemove = jest.genMockFn();
		let card = TestUtils.renderIntoDocument(
			<Card card={cardDetails} removeCard={onRemove}/>
		);

		let deleteBtn = TestUtils.findRenderedDOMComponentWithClass(card, 'remove-card');
		var btn = deleteBtn.querySelectorAll("button");
		TestUtils.Simulate.click(btn[0]);

		expect(card.props.removeCard).toBeCalled();
	});

});
