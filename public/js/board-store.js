import Events from 'events'
import _ from 'lodash'

var CHANGE_EVENT = 'change';

class BoardStore extends Events.EventEmitter {

constructor(){
  super();
	this._lanes = [
			{id:0,  title: 'What went well?', cards: [] },
			{id:1,  title: 'What did not go well?',  cards: []},
			{id:2,  title: 'Action Items', cards: [] }
		]
  }

	getLanes() {
		return _.cloneDeep(this._lanes);
	}

	addLane(lane) {
		this._lanes.push({id: this._lanes.length, title: lane.title, cards:[]});
    this.emitChange();
  }

	removeLane(laneId){
		var laneIndex = _findIndex(this._lanes,{id: laneId});
		this._lanes.splice(laneIndex,1);
    this.emitChange();
	}

	addCard(card, laneId) {
		var lane = _.find(this._lanes, {id: laneId});
		card.id = lane.cards.length;
		lane.cards.push(_.cloneDeep(card));
    this.emitChange();
	}

	updateCard(card, laneId) {
		var lane = _.find(this._lanes, {id: laneId});
		var cardIndex = _.findIndex(lane.cards,{id: card.id});
		lane.cards[cardIndex] = _.cloneDeep(card);
    this.emitChange();
	}

	removeCard(card, laneId) {
		var lane = _.find(this._lanes, {id: laneId});
		var cardIndex = _.findIndex(lane.cards,{id: card.id});
		lane.cards.splice(cardIndex,1);
    this.emitChange();
	}

  emitChange() {
    this.emit(CHANGE_EVENT);
  }

  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback);
  }

  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }
};

module.exports = new BoardStore();
