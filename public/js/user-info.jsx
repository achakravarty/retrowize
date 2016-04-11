import React from 'react';
import boardStore from './board-store';
import BoardEvents from './board-events';
import LeftNav from 'material-ui/lib/left-nav';
import FontIcon from 'material-ui/lib/font-icon';
import Sidebar from './sidebar.jsx';

var UserInfo = React.createClass({

  getInitialState(){
    return {
      user: boardStore.getUser(),
      openSidebar: false
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

  toggleSidebar(){
    this.setState({openSidebar: !this.state.openSidebar});
  },

  render(){
  return (
    <div style={{display: 'inline'}} >
      <div style={styles.profile}>
        <img src={this.state.user.picture}/>
      </div>
      <span>{this.state.user.name}</span>
      <span style={styles.menu} onMouseUp={() => this.toggleSidebar()}>
        <FontIcon className="material-icons" color= {'white'}>menu</FontIcon>
      </span>
      <LeftNav open={this.state.openSidebar} onRequestChange={(open) => {
          console.log(open);
          this.setState({openSidebar: open});
        }}
        docked={false} openRight={true} width={300}>
        <Sidebar/>
      </LeftNav>
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
  },
  menu: {
    verticalAlign: 'sub',
    marginLeft: '20px',
    cursor: 'pointer'
  }
};

module.exports = UserInfo;
