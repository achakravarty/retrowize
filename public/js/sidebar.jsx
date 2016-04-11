'use strict';

import React from 'react';
import IconButton from 'material-ui/lib/icon-button';
import RaisedButton from 'material-ui/lib/raised-button';
import FloatingActionButton from 'material-ui/lib/floating-action-button';
import FontIcon from 'material-ui/lib/font-icon';
import boardActions from './board-actions';
import boardStore from './board-store';
import BoardEvents from './board-events';
import analytics from './analytics';
import Divider from 'material-ui/lib/divider';
import Dialog from 'material-ui/lib/dialog';
import FlatButton from 'material-ui/lib/flat-button';
import TextField from 'material-ui/lib/text-field';

var Sidebar = React.createClass({

  getInitialState(){
    return {
      user: boardStore.getUser() || {},
      boards: boardStore.getBoards() || [],
      showCreateBoardView: false,
      isCreateBoardEnabled: false
    };
  },

  componentWillMount() {
    boardStore.addListener(BoardEvents.USER_UPDATED ,this.updateUser);
    boardStore.addListener(BoardEvents.USER_BOARDS_UPDATED ,this.updateBoards);
    // boardStore.addListener(BoardEvents.BOARD_LOADED,this.updateBoards);
  },

  componentWillUnmount() {
    boardStore.removeListener(BoardEvents.USER_UPDATED, this.updateUser);
    boardStore.removeListener(BoardEvents.USER_BOARDS_UPDATED, this.updateBoards);
    // boardStore.removeListener(BoardEvents.BOARD_LOADED,this.updateBoards);
  },

  updateUser(){
    this.setState({user: boardStore.getUser()});
  },

  updateBoards(){
    this.setState({boards: boardStore.getBoards()});
  },

  logout(){
    analytics.trackSidebarEvent('logout');
    boardActions.logout();
  },

  archiveBoard(_id){
    analytics.trackSidebarEvent('archive-board');
    boardActions.archiveBoard(_id);
  },

  showCreateBoardView(){
    this.setState({showCreateBoardView: true, boardAlreadyExists: false});
  },

  createBoard(){
    analytics.trackSidebarEvent('create-board');
    boardActions.createBoard(this.state.newBoardTitle);
    this.closeCreateBoardDialog();
  },

  closeCreateBoardDialog(){
    analytics.trackSidebarEvent('show-create-board');
    this.setState({showCreateBoardView: false});
  },

  newBoardTitleChanged(event){
    this.setState({newBoardTitle: event.target.value, isCreateBoardEnabled: event.target.value.length > 0});
  },

  render(){
    const actions = [
     <FlatButton
       label="Cancel"
       secondary={true}
       onTouchTap={this.closeCreateBoardDialog}
     />,
     <FlatButton
       label="Submit"
       primary={true}
       disabled={!this.state.isCreateBoardEnabled}
       onTouchTap={this.createBoard}
     />,
   ];

    return (
      <div style={{color: 'black'}}>
        <div style={styles.profile}>
          <img src={this.state.user.picture}/>
        </div>
        <div style={{ background: '#e8e8e8', padding: '10px'}}>
          <div>{this.state.user.name}</div>
          <div style={styles.email}>{this.state.user.email}</div>
          <RaisedButton label="Logout" onTouchTap={this.logout} secondary={true}/>
        </div>
        <Divider/>
        <div style={{ margin: '10px'}}>
          <div style={{marginBottom: '20px', fontSize: '20px'}}>Your boards</div>
        {
          this.state.boards.map((board)=>{
            return (
              <div key={board._id} style={styles.boardItem}>
                <span onMouseDown={()=> analytics.trackSidebarEvent('navigated-to-board')}>
                  <a href={'/board/' + board.id}>{board.id}</a>
                </span>
                <div style={styles.archiveBtn}>
                  <IconButton tooltip="Archive" onTouchTap={()=> this.archiveBoard(board._id)}>
    								<FontIcon className="material-icons" color= {'gray'}>clear</FontIcon>
    						  </IconButton>
                </div>
                <div style={{clear: 'both'}}></div>
              </div>
            );
          })
        }

        <span className="create-board-btn" style={styles.createBoardBtn} >
          <FloatingActionButton className="create-board" tooltip="Create board" onTouchTap={this.showCreateBoardView} >
            <FontIcon className="material-icons">add</FontIcon>
          </FloatingActionButton>
        </span>

        <Dialog
        title="Create new board"
        actions={actions}
        modal={true}
        contentStyle={{maxWidth: '300px'}}
        open={this.state.showCreateBoardView}>

        <div style={{clear: "both"}}>
            <TextField className="new-board-title" hintText="Enter title for new board" onChange={this.newBoardTitleChanged} value={this.state.newBoardTitle}  style={{width: "200px"}}/>
        </div>
        </Dialog>

        </div>
      </div>
    );
  }

});


var styles = {
  profile: {
    borderRadius: '25px',
    border: 'solid 1px gray',
    overflow: 'hidden',
    verticalAlign: 'middle',
    display: 'inline-block',
    float: 'left',
    margin: '5px'
  },

  email: {
    color: 'gray',
    fontSize:'16px',
    marginBottom: '10px'
  },

  archiveBtn: {
    float: 'right',
    display: 'inline-block',
    margin: '-10px'
  },

  createBoardBtn: {
    right: '10px',
    position: 'absolute',
    bottom: '10px'
  },

  boardItem: {
    borderBottom: 'solid 1px lightgray',
    marginBottom: '5px'
  }
};

module.exports = Sidebar;
