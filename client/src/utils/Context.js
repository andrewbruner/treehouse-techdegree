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
    
    const value = {
      authenticatedUser: this.state.authenticatedUser,
      data: this.data,
      actions: {
        signUp: this.signUp,
        signIn: this.signIn,
        signOut: this.signOut,
        getCourses: this.getCourse,
        createCourse: this.createCourse,
        getCourseDetail: this.getCourseDetail,
        updateCourse: this.updateCourse,
      },
    };

    const signIn = async (emailAddress, password) => {
      // attempt to retrieve user from database (using data access)
      const user = await this.data.getUser(emailAddress, password);
      // if user exists...
      if (user !== null) {
        // set authenticatedUser on Provider's state/value
        this.setState(() => {
          return {
            authenticatedUser: user,
          }
        });
        // and set authenticatedUser cookie
        Cookies.set('authenticatedUser', JSON.stringify(user));
      }
      // return user
      return user;
    }
  
    // sign out user
    const signOut = () => {
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
