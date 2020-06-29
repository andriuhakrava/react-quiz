import React, { Component } from 'react';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Auth from './containers/Auth/Auth';
import Quiz from './containers/Quiz/Quiz';
import QuizList from './containers/QuizList/QuizList';
import QuizCreator from './containers/QuizCreator/QuizCreator';
import Logout from './components/Logout/Logout';
import { connect } from 'react-redux';
import { autoLogin } from './store/actions/auth';
import './App.css';

class App extends Component {
	componentDidMount() {
		this.props.autoLogin();
	}

	render() {
		let routes = (
			<Switch>
      	<Route path="/auth" component={ Auth } />
      	<Route path="/quiz/:id" component={ Quiz } />
      	<Route path="/" exact component={ QuizList } />
      	<Redirect to='/' />
      </Switch>
		);

		if (this.props.isAuthenticated) {
			routes = (
				<Switch>
	      	<Route path="/quiz-creator" component={ QuizCreator } />
	      	<Route path="/quiz/:id" component={ Quiz } />
	      	<Route path="/logout" component={ Logout } />
	      	<Route path="/" exact component={ QuizList } />
	      	<Redirect to='/' />
	      </Switch>
			)	
		} 
		return (
	    <div className="App">
	      <Layout>
	    		{ routes }    
	      </Layout>
	    </div>
	  );
	}
}

const mapStateToProps = state => {
	return {
		isAuthenticated: !!state.auth.token
	}
};

const mapDispatchToProps = dispatch => {
	return {
		autoLogin: () => dispatch(autoLogin())
	}
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
