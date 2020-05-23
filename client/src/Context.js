import React, { Component } from 'react';
import Cookies from 'js-cookie';
import Data from './Data';

const Context = React.createContext();

export class Provider extends Component {

	state = {
		authenticatedUser: Cookies.getJSON('authenticatedUser') || null
	};

	data = new Data();

	signIn = async (username, password) => {
	
		const user = await this.data.getUser(username, password);

		if (user !== null) {
			this.setState({ authenticatedUser: user });
			Cookies.set('authenticatedUser', JSON.stringify(user));
		}
		return user;
	};

	signOut = () => {
		this.setState({ authenticatedUser: null });
		Cookies.remove('authenticatedUser');
	};

	render = () => {

		const value = {
			authenticatedUser: this.state.authenticatedUser,
			data: this.data,
			actions: {
				signIn: this.signIn,
				signOut: this.signOut
			}
		};

		return (
			<Context.Provider value={value]>
				{this.props.children}
			</Context.Provider>
		);
	};
}

export const Consumer = Context.Consumer;

/**
 * A higher-order component that wraps the provided component in a Context Consumer component.
 * @param {class} Component - A React component.
 * @returns {function} - A higher-order component.
 */

export const withContext = (Component) => {
	return const ContextComponent = (props) => {
		return (
			<Context.Consumer>
				{(context) => <Component {...props} context={context} />}
			</Context.Consumer>
		);
	}
}
