import reqwest from 'reqwest';

class BoardService {

    createBoard(boardId){
      return reqwest({
          url: '/api/boards',
          method: 'post',
          data: { 'name': boardId}
      });
    }

    archiveBoard(_id){
      return reqwest({
          url: `/api/boards/${_id}`,
          method: 'delete'
      });
    }

    getBoard(boardId){
      return reqwest({
          url: `/api/boards/${boardId}`,
          method: 'get'
      });
    }

    getBoards(){
      return reqwest({
          url: `/api/boards`,
          method: 'get'
      });
    }

    addLane(boardId, title){
      return reqwest({
          url: `/api/boards/${boardId}/lanes`,
          method: 'post',
          data: { 'title': title}
      });
    }

    updateLaneTitle(boardId, laneId, title){
      return reqwest({
          url: `/api/boards/${boardId}/lanes/${laneId}`,
          method: 'put',
          data: { 'title': title}
      });
    }

    removeLane(boardId, laneId){
      return reqwest({
          url: `/api/boards/${boardId}/lanes/${laneId}`,
          method: 'delete',
      });
    }

    addCard(boardId, laneId, content){
      return reqwest({
          url: `/api/boards/${boardId}/lanes/${laneId}/cards`,
          method: 'post',
          data: { 'content': content}
      });
    }

    updateCardContent(boardId, laneId, cardId, content){
      return reqwest({
          url: `/api/boards/${boardId}/lanes/${laneId}/cards/${cardId}`,
          method: 'put',
          data: { 'content': content}
      });
    }

    removeCard(boardId, laneId, cardId){
      return reqwest({
          url: `/api/boards/${boardId}/lanes/${laneId}/cards/${cardId}`,
          method: 'delete',
      });
    }

    voteCard(boardId, laneId, cardId){
      return reqwest({
          url: `/api/boards/${boardId}/lanes/${laneId}/cards/${cardId}/vote`,
          method: 'put',
      });
    }

    logout(){
      window.location.href = '/logout';
    }

}

module.exports = new BoardService();
