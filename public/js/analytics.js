'use strict'

class Analytics {
  trackBoardEvent(action, boardId){
    ga('send', 'event', 'Board', action, boardId);
  }
}

module.exports = new Analytics();
