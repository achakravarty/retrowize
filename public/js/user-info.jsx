import React from 'react';
import boardStore from './board-store';
import BoardEvents from './board-events';

var UserInfo = React.createClass({

  getInitialState(){
    return {
      user: boardStore.getUser()
    };
  },

  componentWillMount() {
		boardStore.addListener(BoardEvents.USER_UPDATED ,this.updateUser);
	},

	componentWillUnmount() {
		boardStore.removeListener(BoardEvents.USER_UPDATED, this.updateUser);
	},

	updateUser(){
		this.setState({ user: boardStore.getUser()});
	},

  render(){
  return (
    <div style={{display: 'inline'}}>
      <div style={styles.profile}>
        <img src={this.state.user.picture}/>
      </div>
      <span>{this.state.user.name}</span>
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
    margin: '0 5px',
    display: 'inline-block'
  }
};

module.exports = UserInfo;
