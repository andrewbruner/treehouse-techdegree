import React, { Component } from 'react';

class UserSignIn extends Component {
	state = {
		emailAddressValue: '',
		passwordValue:  ''
	}

	render() {
        return (
        	<div className="bounds">
        		<div className="grid-33 centered signin">
          			<h1>Sign In</h1>
          			<div>
						<form>
							<div>
								<input id="emailAddress" name="emailAddress" type="text" className="" placeholder="Email Address" value={this.state.emailAddressValue} onChange={(e) => this.setState({ emailAddressValue: e.target.value })} />
							</div>
							<div>
								<input id="password" name="password" type="password" className="" placeholder="Password" value={this.state.passwordValue} onChange={(e) => this.setState({ passwordValue: e.target.value })} />
							</div>
							<div className="grid-100 pad-bottom">
								<button className="button" type="submit" onClick={(e) => {e.preventDefault(); this.props.signIn(this.state.emailAddressValue, this.state.passwordValue);}}>Sign In</button>
								<button className="button button-secondary" onClick={(e) => {e.preventDefault(); window.location.href='/'}}>Cancel</button>
							</div>
						</form>
          			</div>
          			<p>&nbsp;</p>
          			<p>Don't have a user account? <a href="/signup">Click here</a> to sign up!</p>
        		</div>
			</div>
        )
    }
}

export default UserSignIn;
