'use strict'

import React from 'react'
import Paper from 'material-ui/lib/paper';
import Badge from 'material-ui/lib/badge';
import IconButton from 'material-ui/lib/icon-button';
import FontIcon from 'material-ui/lib/font-icon';

var Card = React.createClass( {

	render(){
		return (
			<Paper zDepth={2} className="card" style={{backgroundColor: this.props.color}}>
				   <div className="card-content">{this.props.content}</div>

						 <div className="like-btn" >
							 <Badge secondary={true} badgeContent={this.props.likes} badgeStyle={{fontSize: "14px"}}
								className="votes">
						  <IconButton tooltip="Vote this card" onTouchTap={this.props.onLike}>
								<FontIcon className="material-icons"  color= {"orange"}>thumb_up</FontIcon>
						  </IconButton>
					 </Badge>
				 </div>



					<IconButton tooltip="Remove this card" onTouchTap={this.props.removeCard}>
						<FontIcon className="material-icons trash-icon" color={"gray"} >delete</FontIcon>
					</IconButton>

				</Paper>
			)
	}
});

module.exports = Card
