// dependencies
import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

// functional Header component with context destructured from props
export default ({ context }) => {

  // destructure authenticatedUser from context
  const { authenticatedUser } = context;

  // return 1 of 2 navigation headers, depending on if user is logged in
  return (
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
  );
};
