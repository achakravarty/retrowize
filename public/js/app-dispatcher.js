import Flux from 'flux';
import ActionTypes from './action-types'
import boardStore from './board-store';

var appDispatcher = new Flux.Dispatcher();

appDispatcher.register(function(action) {

  switch(action.actionType) {
    case ActionTypes.CREATE_BOARD:
      if (action.boardId) {
        boardStore.createBoard(action.boardId);
      }
      break;

    case ActionTypes.ARCHIVE_BOARD:
      if (action._id) {
        boardStore.archiveBoard(action._id);
      }
      break;

    case ActionTypes.FETCH_LANES:
      if (action.boardId) {
        boardStore.fetchLanes(action.boardId);
      }
      break;

    case ActionTypes.ADD_LANE:
      if (action.lane) {
        boardStore.addLane(action.lane);
      }
      break;

    case ActionTypes.UPDATE_LANE_TITLE:
      if (action.laneId) {
        boardStore.updateLaneTitle(action.laneId, action.title);
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

    case ActionTypes.UPDATE_CARD_CONTENT:
      if (action.cardId && action.laneId !== undefined){
        boardStore.updateCardContent(action.laneId, action.cardId, action.content);
      }
      break;

    case ActionTypes.REMOVE_CARD:
      if (action.card && action.laneId !== undefined){
        boardStore.removeCard(action.card, action.laneId);
      }
      break;

    case ActionTypes.VOTE_CARD:
      if (action.card && action.laneId !== undefined){
        boardStore.voteCard(action.card, action.laneId);
      }
      break;

    case ActionTypes.LOGOUT:
      boardStore.logout();
      break;
    }
});

module.exports = appDispatcher;
