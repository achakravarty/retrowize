jest.dontMock('../public/js/card.jsx');
jest.dontMock('material-ui/lib/font-icon');
jest.dontMock('react-tap-event-plugin');

import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';

const injectTapEventPlugin = require('react-tap-event-plugin');
injectTapEventPlugin();

const Card = require('../public/js/card.jsx');
const FontIcon = require('material-ui/lib/font-icon');

var boardStore = require('../public/js/board-store');

describe('Card', () => {

	it('should show card content', () => {
		let card = TestUtils.renderIntoDocument(
			<Card content="My card" likes={0}/>
		);

		let content = TestUtils.findRenderedDOMComponentWithClass(card,'card-content')

		expect(content.textContent).toBe('My card');
	});

	it('should have zero likes', () => {
		let card = TestUtils.renderIntoDocument(
			<Card content="My card" likes={0}/>
		);

		expect(card.props.likes).toBe(0);
	});

	it('should be able to increment likes', () => {
		let card = TestUtils.renderIntoDocument(
			<Card content="My card" likes={0}/>
		);

		let like = TestUtils.findRenderedDOMComponentWithClass(card, 'like-btn');
		TestUtils.Simulate.touchTap(like);

		expect(card.props.onLike).toBeCalled;
		expect(boardStore.updatedCard).toBeCalled;
	});

	it('should be able to delete card', () => {
		let card = TestUtils.renderIntoDocument(
			<Card content="My card" likes={0}/>
		);

		let deleteBtn = TestUtils.findRenderedDOMComponentWithClass(card, 'trash-icon');
		TestUtils.Simulate.touchTap(deleteBtn);

		expect(card.props.removeCard).toBeCalled;
		expect(boardStore.removeCard).toBeCalled;
	});

})
