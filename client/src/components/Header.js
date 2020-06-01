// Dependencies
import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

// Header
export default function Header(props) {

  // Context
  const { context } = props;

  // Authenticated User
  const { authenticatedUser } = context;

  return (
    <Fragment>
      <div className="header">
        <div className="bounds">
          <h1 className="header--logo">Courses</h1>
          <nav>
            {authenticatedUser ? (
              <Fragment>
                <span>Welcome {authenticatedUser.firstName} {authenticatedUser.lastName}!</span>
                <Link className="signout" to="/signout">Sign Out</Link>
              </Fragment>
            ) : (
            <Fragment>
              <Link className="signup" to="/signup">Sign Up</Link>
              <Link className="signin" to="/signin">Sign In</Link>
            </Fragment>
            )}
          </nav>
        </div>
      </div>
      <hr />
    </Fragment>
  );
};