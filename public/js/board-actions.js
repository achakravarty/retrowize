var AppDispatcher = require('./app-dispatcher');
var ActionTypes = require('./action-types');

var BoardActions = {

  createBoard: function(boardId){
    AppDispatcher.dispatch({
      actionType: ActionTypes.CREATE_BOARD,
      boardId: boardId
    });
  },

  fetchLanes: function(boardId){
    AppDispatcher.dispatch({
      actionType: ActionTypes.FETCH_LANES,
      boardId: boardId
    });
  },

  addLane: function(lane) {
     AppDispatcher.dispatch({
       actionType: ActionTypes.ADD_LANE,
       lane: lane
     });
   },

   removeLane: function(laneId){
     AppDispatcher.dispatch({
       actionType: ActionTypes.REMOVE_LANE,
       laneId: laneId
     });
   },

   addCard: function(card, laneId){
     AppDispatcher.dispatch({
       actionType: ActionTypes.ADD_CARD,
       card: card,
       laneId: laneId
     });
   },

   removeCard: function(card, laneId){
     AppDispatcher.dispatch({
       actionType: ActionTypes.REMOVE_CARD,
       card: card,
       laneId: laneId
     });
   },

   voteCard: function(card, laneId){
     AppDispatcher.dispatch({
       actionType: ActionTypes.VOTE_CARD,
       card: card,
       laneId: laneId
     });
   }
}

module.exports = BoardActions;
