// Dependencies
import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Cookies from 'js-cookie';

// Styles
import './styles/global.css';

// Components
import Header from './components/Header';
// import Courses from './components/Courses';
// import CreateCourse from './components/CreateCourse';
// import CourseDetail from './components/CourseDetail';
// import UpdateCourse from './components/UpdateCourse';
import UserSignUp from './components/UserSignUp';
// import UserSignIn from './components/UserSignIn';
// import UserSignOut from './components/UserSignOut';

// Context
import withContext from './utils/Context';

// Components with Context
const HeaderWithContext = withContext(Header);
const UserSignUpWithContext = withContext(UserSignUp);
// const UserSignInWithContext = withContext(UserSignIn);

  
export default class App extends Component {

  render() {
    return (
      <div>
        <Router>
          <HeaderWithContext />
          <hr />
          <Switch>
            {/* <Route exact path="/" component={Courses} /> */}
            {/* <Route path="/courses/create" component={CreateCourse} /> */}
            {/* <Route path="/courses/:id" component={CourseDetail} /> */}
            {/* <Route path="/courses/:id/update" component={UpdateCourse} /> */}
            <Route path="/signup" component={UserSignUpWithContext} />
            {/* <Route path="/signin" component={UserSignInWithContext} /> */}
            {/* <Route path="/signout" component={UserSignOut} /> */}
          </Switch>
        </Router>
      </div>
    )
  }
};