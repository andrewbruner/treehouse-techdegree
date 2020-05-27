// dependencies
import React, { Component } from 'react';
import Cookies from 'js-cookie';
import Data from './Data';

// create context
const Context = React.createContext(); 

// export Provider class component
export class Provider extends Component {

  // initiate state with either currently logged-in user (retrieved from cookie) or null
  state = {
    authenticatedUser: Cookies.getJSON('authenticatedUser') || null,
  };

  // access Data class
  constructor() {
    super();
    this.data = new Data();
  }

  render() {

    // destructure authenticatedUser from state
    const { authenticatedUser } = this.state;
    
    // initiate Provider value with authenticatedUser, data access, and several actions defined below
    const value = {
      authenticatedUser,
      data: this.data,
      actions: {
        signIn: this.signIn,
        signOut: this.signOut,
      },
    };

    // sign in user (using email address and password)
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

    // create course (using course, email address and password)
    const createCourse = async (course, emailAddress, password) => {
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
