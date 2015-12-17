import Flux from 'flux';
import ActionTypes from './action-types'
import boardStore from './board-store';

var appDispatcher = new Flux.Dispatcher();

appDispatcher.register(function(action) {

  switch(action.actionType) {
    case ActionTypes.ADD_LANE:
      if (action.lane) {
        boardStore.addLane(action.lane);
      }
      break;

    case ActionTypes.REMOVE_LANE:
      if (action.laneId) {
        boardStore.removeLane(action.laneId);
      }
      break;

    case ActionTypes.ADD_CARD:
      if (action.card && action.laneId !== undefined){
        boardStore.addCard(action.card, action.laneId);
      }
      break;

    case ActionTypes.REMOVE_CARD:
      if (action.card && action.laneId !== undefined){
        boardStore.removeCard(action.card, action.laneId);
      }
      break;

    case ActionTypes.UPDATE_CARD:
      if (action.card && action.laneId !== undefined){
        boardStore.updateCard(action.card, action.laneId);
      }
      break;
    }
});

module.exports = appDispatcher;
