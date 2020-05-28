// Dependencies
import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// Styles
import './styles/global.css';

// Components
import Header from './components/Header';

import UserSignUp from './components/UserSignUp';
import UserSignIn from './components/UserSignIn';
import UserSignOut from './components/UserSignOut';

import Courses from './components/Courses';
import CreateCourse from './components/CreateCourse';
import CourseDetail from './components/CourseDetail';
import UpdateCourse from './components/UpdateCourse';

import NotFound from './components/NotFound';
import Forbidden from './components/Forbidden';
import UnHandledError from './components/UnhandledError';

import withContext from './utils/Context';
import CourseDetail from './components/CourseDetail';
import PrivateRoute from './utils/PrivateRoute';


// Components with Context
const HeaderWithContext = withContext(Header);

const UserSignUpWithContext = withContext(UserSignUp);
const UserSignInWithContext = withContext(UserSignIn);
const UserSignOutWithContext = withContext(UserSignOut);

const CoursesWithContext = withContext(Courses);
const CreateCourseWithContext = withContext(CreateCourse);
const CourseDetailWithContext = withContext(CourseDetail);
const UpdateCourseWithContext = withContext(UpdateCourse);
  
export default class App extends Component {

  render() {
    return (
      <Router>
        <div>
          <HeaderWithContext />
          <hr />
          <Switch>
            <Route exact path="/" component={CoursesWithContext} />
            <Route path="/signup" component={UserSignUpWithContext} />
            <Route path="/signin" component={UserSignInWithContext} />
            <Route path="/signout" component={UserSignOutWithContext} />
            <Route path="/courses/create" component={CreateCourseWithContext} />
            <Route path="/courses/:id" component={CourseDetailWithContext} />
            <Route path="/courses/:id/update" component={UpdateCourseWithContext} />
            <Route component={NotFound} />
          </Switch>
        </div>
      </Router>
    )
  }
};
