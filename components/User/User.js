import React from 'react';
import ReactDOM from 'react-dom';
import Editor from "./Editor";
import {Link} from "react-router-dom";
import {parseQuery} from "../../helpers/helpers.js"

var User = React.createClass({

	getInitialState: function() {
		return{
			title: null,
			paragraphs: [],
			articleUrl: parseQuery()
		}
	},

	componentDidMount: function() {
		var self = this;

		var requestUrl = "/article?url=" + this.state.articleUrl;

     	//request for parsed article
     	if(!this.state.articleUrl){
     		return alert('No article url');
     	}
		fetch(requestUrl)
		  .then(function(response) {
		    return response.json();
		   })
		  .then(function(json){
		  	self.setState({
		  		title: json.title, 
		  		paragraphs: json.paragraphs
		  	});
		  })
		  .catch(function(e){
		  	console.log(e);
		  });
  	},

  	render: function(){
  		const {title, paragraphs, articleUrl} = this.state;
  		return (
  			<div>
  				<Link to="/fb/results">Admin</Link>
  				{title && (<Editor text={title} articleUrl={articleUrl} />) }
	  			{paragraphs.map(function(item){
		    		return <Editor key={item} text={item} articleUrl={articleUrl} />
		    	})}
	    	</div>
	    )	 
  	}
});

export default User;