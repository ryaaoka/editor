import React from 'react';
import ReactDOM from 'react-dom';
import EditsApprove from "./EditsApprove";


var Admin = React.createClass({
	getInitialState: function() {
		return {
			edits: []
		}
	},

	componentDidMount: function() {
		var self = this;

     	//request for edits in db
		fetch('/result')
		  .then(function(response) {
		    return response.json();
		   })
		  .then(function(json){
		  	self.setState({edits: json});
		  })
		  .catch(function(e){
		  	console.log(e);
		  });
  	},


  	//update or delete an entry in db when one of buttons - delete or approve - is clicked
  	makeRequest: function(bool, id){
  		var self = this;
		var json = {id: id, isApproved: bool};
	
		fetch('/update', {
			method: "POST",
			body: JSON.stringify(json)
			})
	  		.then(function(res) {
	    		console.log(res);

	    		//delete this entry from our component state for it's rerendering 
	    		self.setState({edits:self.state.edits.filter(function(item){
	    			return item._id !== id;
	    		})})
		  	 })
		  	.catch(function(res){
		  		console.log(res);
		  	});
	},

  	render: function() {
  		var makeRequest = this.makeRequest;
  		const { edits } = this.state;
    	return (
      		<div>
		    	{edits.map(function(item){
		    		return <EditsApprove key={item._id}
		    			text={item.originalText}
		    			user_text={item.usersText}
		    			id={item._id}
		    			makeRequest={makeRequest} />
		    	})}
		    </div>
		)
  	},
});

export default Admin;
