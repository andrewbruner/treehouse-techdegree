// Dependencies
import React, { Component } from 'react';
import Cookies from 'js-cookie';
import Data from './Data';

// Context
const Context = React.createContext(); 

// Provider
export class Provider extends Component {

  constructor() {
    super();
    this.data = new Data();
  }

  state = {
    authenticatedUser: Cookies.getJSON('authenticatedUser') || null,
  };

  render() {
    
    // Value
    const value = {
      authenticatedUser: this.state.authenticatedUser,
      data: this.data,
      actions: {
        signUp: this.signUp,
        signIn: this.signIn,
        signOut: this.signOut,
        getCourses: this.getCourses,
        createCourse: this.createCourse,
        getCourseDetail: this.getCourseDetail,
        updateCourse: this.updateCourse,
        deleteCourse: this.deleteCourse,
      },
    };

    // Sign Up / Create User
    const signUp = async (user, confirmPassword) => {
      user.password === confirmPassword ? (
        new Error('Passwords do not match')
       ) : (
        await this.data.createUser(user)
       );
    };

    // Sign In
    const signIn = async (emailAddress, password) => {

      await this.data.api(`/users`, 'GET', null, true, { emailAddress, password })

        .then(response => {
          if (response.status === 200) {
            return response.json();
          } else if (response.status === 401) {
            return null
          } else {
            throw new Error();
          }
        })

        .then(data => {
          this.setState(() => {
            return {
              authenticatedUser: data,
            }
          });
          Cookies.set('authenticatedUser', JSON.stringify(data));
          return data;
        });

    }
  
    // sign out user
    signOut = () => {
      // set authenticatedUser on Provider's state/value to null
      this.setState({ authenticatedUser: null });
      // and remove authenticatedUser cookie
      Cookies.remove('authenticatedUser');
    }
  
    return (
      <Context.Provider value={value}>
        {this.props.children}
      </Context.Provider>  
    );
  }
};

// export Consumer component
export const Consumer = Context.Consumer;

/**
 * A higher-order component that wraps the provided component in a Context Consumer component.
 * @param {class} Component - A React component.
 * @returns {function} A higher-order component.
 */

export default function withContext(Component) {
  return function ContextComponent(props) {
    return (
      <Context.Consumer>
        {context => <Component {...props} context={context} />}
      </Context.Consumer>
    );
  }
};
