import React from 'react';
import Cookies from 'js-cookie';
import { Redirect } from 'react-router-dom';

const UserSignOut = props => {
	props.signOut();
	if (Cookies.get('authenticatedUser') === undefined) {
    		return (
        		<Redirect to='/' />
    		)
	}
}

export default UserSignOut;
