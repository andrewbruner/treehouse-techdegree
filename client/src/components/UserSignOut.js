import React from 'react';
import { Redirect } from 'react-router-dom';

const UserSignOut = props => {
    return (
        <div onLoad={(e) => props.signOut()}>
            <Redirect onLoad={(e) => {props.signOut()}} to='/' />
        </div>
    );
}

export default UserSignOut;