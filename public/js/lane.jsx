'use strict'

import React from 'react'
import Card from './card.jsx'
import TextField from 'material-ui/lib/text-field'
import FloatingActionButton from 'material-ui/lib/floating-action-button'
import boardActions from './board-actions';

var Lane = React.createClass( {
	addNewCard(){
		let card = {
			content : this.refs.newCardContent.getValue(),
			likes: 0
		}
		boardActions.addCard(card,this.props.id);
		this.refs.newCardContent.setValue('');
	},

	onLike(card) {
		card.likes = card.likes + 1;
		boardActions.updateCard(card, this.props.id);
	},

	removeCard(card) {
		boardActions.removeCard(card, this.props.id);
	},

	render(){

		var getCards = ()=>{
			return this.props.cards.map((card, index) => {
				return (
					     <Card key={card.id} content={card.content} likes={card.likes}
							onLike={
								() => {
								this.onLike(card)
								}}
								removeCard={
									() => {
									this.removeCard(card)
								}}
								/>
						);
			});
		}

		return (<div className="lane">
			<div className="title">{this.props.title}</div>
			<div>
				<TextField hintText="Feedback" ref="newCardContent"/>
				<FloatingActionButton className="add-btn" onTouchTap={this.addNewCard} primary={true} mini={true}>
					<span>+</span>
				</FloatingActionButton>
			</div>

			{getCards()}
		</div>);
	}
})

module.exports = Lane
