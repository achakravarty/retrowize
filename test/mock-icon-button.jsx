import React from 'react';

var MockButton = React.createClass({
	render(){
		return (
			<button className={this.props.className} onClick={this.props.onTouchTap}/>
		);
	}
});

module.exports = MockButton;
