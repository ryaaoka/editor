import React from 'react';
import ReactDOM from 'react-dom';

var EditsApprove = React.createClass({
	handleApprove: function(){
		this.props.makeRequest(true, this.props.id);
	},
	handleDelete: function(){
		this.props.makeRequest(false, this.props.id);
	},
	render: function(){
		const {text, user_text} = this.props;
		return(
			<div className="box">
				<div className="edit-form">
					<span className="title">Original Text</span>
					<p className="original-text">{text}</p>
					<span className="title">Users Version</span>
					<p className="users-text">{user_text}</p>
					<button className='delete' onClick={this.handleDelete}>DELETE</button>
					<button className='approve' onClick={this.handleApprove}>APPROVE</button>
				</div>
			</div>
		);
	}
});

export default EditsApprove;