import React from 'react';

const Header = props => {
  let authenticationNavigation = '';
  props.authenticated
  ? authenticationNavigation = <nav><span>Welcome Joe Smith!</span><a className="signout" href="/signout">Sign Out</a></nav>
  : authenticationNavigation = <nav><a className="signup" href="/signup">Sign Up</a><a className="signin" href="/signin">Sign In</a></nav>

  return (
    <div className="header">
      <div className="bounds">
        <h1 className="header--logo">Courses</h1>
        {authenticationNavigation}
      </div>
    </div>
  );
}

export default Header;
