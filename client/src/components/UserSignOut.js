import React from 'react';
import Cookies from 'js-cookie';

const UserSignOut = props => {
    Cookies.remove('authenticatedUser');

    return (
        <Redirect to ='/' />
    );
}

export default UserSignOut;