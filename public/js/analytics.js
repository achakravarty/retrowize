'use strict'

class Analytics {
  trackBoardEvent(action, boardId){
    ga('send', 'event', 'Board', action, boardId);
  }

  trackSidebarEvent(action){
    ga('send', 'event', 'Sidebar', action);
  }
}

module.exports = new Analytics();
