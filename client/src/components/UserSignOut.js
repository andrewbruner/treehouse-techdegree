// dependencies
import React from 'react';
import { Redirect } from 'react-router-dom';

// functional UserSignOut component with context destructured from props
export default ({ context }) => {

  // destructure signout function from context actions
  const { signOut } = context.actions;

  // sign out the user
  signOut();

  // redirect to home page
  return (
      <Redirect to='/' />
  );
};
