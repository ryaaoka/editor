import React from 'react';
import ReactDOM from 'react-dom';


var Editor = React.createClass({

	//on textarea change save the value 
	handleChange: function(event){
		this.setState({text_value: event.target.value});
	},

	handleSubmit: function(event){
		event.preventDefault();

		var json = {
			articleURL: this.props.articleUrl,
			originalText: this.props.text,
			usersText: this.state.text_value
		};

		fetch('/sendChanges', {
			method: "POST",
			headers: {
                'Content-Type': 'application/json'
            },
			body: JSON.stringify(json)
		})
  		.then(function(res) {
    		console.log(res);
    		alert('Edit has been sent');
	  	 })
	  	.catch(function(res){
	  		console.log(res);
	  	});
	},

	render: function(){
		return(
			<div className="box">
				<div className="edit-form">
					<span className="title">Original Text</span>
					<p className="original-text">{this.props.text}</p>
					<span className="title">Users Version</span>
					<form onSubmit={this.handleSubmit}>
						<textarea onChange={this.handleChange}></textarea>
						<button className='send'>SEND CHANGES</button>
					</form>
				</div>
			</div>
		);
	}

});

export default Editor;