// Dependencies
import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

// Define REST API's Host Port for fetch()
  // Use this host for default localhost
  // const host = 'http://localhost:5000
  // Use this host for localhost using ChromeOS
  const host = 'http://penguin.linux.test:5000';

// Components
import Courses from './components/Courses';
import CourseDetail from './components/CourseDetail';
import UserSignIn from './components/UserSignIn';
import UserSignUp from './components/UserSignUp';
import CreateCourse from './components/CreateCourse';
import UpdateCourse from './components/UpdateCourse';
import Header from './components/Header';
import UserSignOut from './components/UserSignOut';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" render={props => <Courses />} />
          <Route path="/courses/create" render={props => <CreateCourse />} />
          <Route path="/courses/:id/update" render={props => <UpdateCourse />} />
          <Route path="/courses/:id" render={props => <CourseDetail />} />
          <Route path="/signin" render={props => <UserSignIn />} />
          <Route path="/signup" render={props => <UserSignUp />} />
          <Route path="/signout" render={props => <UserSignOut />} />
        </Switch>
      </BrowserRouter>
    )
  }
}

export default App;
