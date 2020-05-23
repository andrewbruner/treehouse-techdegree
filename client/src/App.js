// Dependencies
import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
//import Cookies from 'js-cookie';

// Styles
import './styles/global.css';

// Components
import Header from './components/Header';
import Courses from './components/Courses';
import CourseDetail from './components/CourseDetail';
import UserSignIn from './components/UserSignIn';
import UserSignUp from './components/UserSignUp';
import CreateCourse from './components/CreateCourse';
import UpdateCourse from './components/UpdateCourse';
import UserSignOut from './components/UserSignOut';

import withContext from './Context';

const HeaderWithContext = withContext(Header);

//DELETE THIS LATER
const host = 'penguin.linux.test:5000';

class App extends Component {

	render() {
		return (
			<Router>
				<HeaderWithContext />
				<hr />
				<Switch>
					<Route exact path="/" render={props => <Courses host={host} />} />
					<Route path="/courses/create" render={props => <CreateCourse />} />
					<Route path="/courses/:id/update" render={props => <UpdateCourse host={host} id={props.match.params.id} />} />
					<Route path="/courses/:id" render={props => <CourseDetail host={host} id={props.match.params.id} handleDelete={this.handleDelete} />} />
					<Route path="/signin" render={props => <UserSignIn signIn={this.state.signIn} />} />
					<Route path="/signup" render={props => <UserSignUp />} />
					<Route path="/signout" render={props => <UserSignOut signOut={this.state.signOut} />} />
				</Switch>
			</Router>
		)
	}
}

export default App;
