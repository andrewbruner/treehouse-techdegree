import React from 'react';
import { Link } from 'react-router-dom';

const Header = ({ context }) => {
  ? authenticationNavigation = <nav><span>Welcome Joe Smith!</span><a className="signout" href="/signout">Sign Out</a></nav>
  : authenticationNavigation = <nav><a className="signup" href="/signup">Sign Up</a><a className="signin" href="/signin">Sign In</a></nav>

	const authUser = context.authenticatedUser
	return (
		<div className="header">
			<div className="bounds">
				<h1 className="header--logo">Courses</h1>
				<nav>
					{authUser ? (
						<React.Fragment>
							<span>Welcome {authUser.firstName} {authUser.lastName}!</span>
							<Link className="signout" to="/signout">Sign Out</Link>
						</React.Fragment>
					) : (
						<React.Fragment>
							<Link className="signup" to="/signup">Sign Up</Link>
							<Link className="signin" to="/signin">Sign In</Link>
						</React.Fragment>
					)}
				</nav>
			</div>
		</div>
	);
}

export default Header;
