var AppDispatcher = require('./app-dispatcher');
var ActionTypes = require('./action-types');

var BoardActions = {

  createBoard: function(boardId){
    AppDispatcher.dispatch({
      actionType: ActionTypes.CREATE_BOARD,
      boardId: boardId
    });
  },

  archiveBoard: function(_id){
    AppDispatcher.dispatch({
      actionType: ActionTypes.ARCHIVE_BOARD,
      _id: _id
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

   updateLaneTitle:function(laneId, title){
     AppDispatcher.dispatch({
       actionType: ActionTypes.UPDATE_LANE_TITLE,
       laneId: laneId,
       title: title
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

   updateCardContent: function(laneId, cardId, content){
     AppDispatcher.dispatch({
       actionType: ActionTypes.UPDATE_CARD_CONTENT,
       cardId: cardId,
       laneId: laneId,
       content: content
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
   },

   logout: function(){
     AppDispatcher.dispatch({
       actionType: ActionTypes.LOGOUT
     });
   }
};

module.exports = BoardActions;
