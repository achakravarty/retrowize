var AppDispatcher = require('./app-dispatcher');
var ActionTypes = require('./action-types');

var BoardActions = {

  addLane: function(lane) {
     AppDispatcher.dispatch({
       actionType: ActionTypes.ADD_LANE,
       lane: lane
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

   updateCard: function(card, laneId){
     AppDispatcher.dispatch({
       actionType: ActionTypes.UPDATE_CARD,
       card: card,
       laneId: laneId
     });
   }
}

module.exports = BoardActions;
