import React from 'react';
import { Redirect } from 'react-router-dom';

const UserSignOut = props => {
    return (
        <Redirect onLoad={(e) => {props.signOut()}} to='/' />
    );
}

export default UserSignOut;