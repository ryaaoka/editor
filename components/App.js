import React from 'react';
import ReactDOM from 'react-dom';
import {
	Switch,
  	Route
} from 'react-router-dom';

import User from '../components/User/User';
import Admin from '../components/Admin/Admin';

var App = React.createClass({
	render: function(){
		return(
			<Switch>
      			<Route exact path='/fb' component={User}/>
      			<Route path='/fb/results' component={Admin}/>
    		</Switch>
    	)
	}
});

export default App;

