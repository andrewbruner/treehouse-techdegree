// Dependencies
import React from 'react';
import { Redirect } from 'react-router-dom';

// UserSignOut
export default (props) => {

  // context
  const { context } = props;

  // signout
  context.actions.signOut();

  // redirect
  return (
      <Redirect to='/' />
  );
};
