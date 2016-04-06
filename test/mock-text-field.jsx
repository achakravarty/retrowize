import React from 'react';

var MockTextField = React.createClass({
	render(){
		return (
			<input className={this.props.className} onChange={this.props.onChange}/>
		);
	}
});

module.exports = MockTextField;
