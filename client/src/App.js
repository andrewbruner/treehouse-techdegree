// Dependencies
import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
//import Cookies from 'js-cookie';

// Styles
import './styles/global.css';

// Components
import AuthenticationContext from './components/context/Context';
import Courses from './components/Courses';
import CourseDetail from './components/CourseDetail';
import UserSignIn from './components/UserSignIn';
import UserSignUp from './components/UserSignUp';
import CreateCourse from './components/CreateCourse';
import UpdateCourse from './components/UpdateCourse';
import Header from './components/Header';
import UserSignOut from './components/UserSignOut';

// Define REST API's Host Port for fetch()
  // Use this host for default localhost
  // const host = 'http://localhost:5000';
  // Use this host for localhost using ChromeOS
  const host = 'http://penguin.linux.test:5000';
  
class App extends Component {

  state = {
    authenticatedUser: null,
    signIn: async (emailAddress, password) => {
      await fetch(`${host}/users`, {
        headers: { 'Authorization': 'Basic ' + btoa(`${emailAddress}:${password}`) }
      })
        .then(response => {
          if (response.status === 200) {
            response.json();
          } else if (response.status === 401) {
            throw new Error('Invalid credentials');
          }
        })
        .then(data => this.setState({ authenticatedUser: { emailAddress: data.emailAddress, password: data.password } }));
    }
  }

  handleDelete = async id => {
    await fetch(
      `${host}/api/courses/${id}`,
      {
        method: 'delete',
        headers: {
          'Authorization': 'Basic ' + btoa(`${this.state.authenticatedUser.emailAddress}:${this.state.authenticatedUser.password}`)
        }
      }
    )
  }

  render() {
    return (
      <AuthenticationContext.Provider value={this.state}>
        <BrowserRouter>
          <AuthenticationContext.Consumer>{value => <Header authenticated={value} />}</AuthenticationContext.Consumer>
          <hr />
          <Switch>
            <Route exact path="/" render={props => <Courses host={host} />} />
            <Route path="/courses/create" render={props => <CreateCourse />} />
            <Route path="/courses/:id/update" render={props => <UpdateCourse host={host} id={props.match.params.id} />} />
            <Route path="/courses/:id" render={props => <CourseDetail host={host} id={props.match.params.id} handleDelete={this.handleDelete} />} />
            <Route path="/signin" render={props => <UserSignIn />} />
            <Route path="/signup" render={props => <UserSignUp />} />
            <Route path="/signout" render={props => <UserSignOut />} />
          </Switch>
        </BrowserRouter>
      </AuthenticationContext.Provider>
    )
  }
}

export default App;
