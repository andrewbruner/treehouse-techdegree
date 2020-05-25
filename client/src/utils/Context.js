import React, { Component } from 'react';
// import the Data.js file containing the helper class
import Data from './Data';

const Context = React.createContext(); 

export class Provider extends Component {

  constructor() {
    super();
    // initialize a new instance of the Data class inside the constructor() method
    // assign it to a data property (this.data)
    this.data = new Data();
  }

  render() {

    // create a value object to provide the utility methods of the Data class
    const value = {
      data: this.data,
      actions: {
        // pass signIn method to the Provider
        signIn: this.signIn,
      }
    };

    return (
      // pass the Provider a value prop
      <Context.Provider value={value}>
        {this.props.children}
      </Context.Provider>  
    );
  }

  
  signIn = async (username, password) => {
    // initialize user as the returned object of getUser()
    const user = await this.data.getUser(username, password);
    // return that user
    return user;
  }

  signOut = () => {

  }
}

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
}