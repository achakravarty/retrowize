import React from 'react';
import userService from './user-service';

var UserInfo = React.createClass({

  getInitialState(){
    return {
      user: {}
    };
  },

  componentDidMount(){
    userService.getUser()
    .then((resp)=>{
      this.setState({user: resp});
    });
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
