import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Form from './Form';

class UserSignIn extends Component {
	state = {
		emailAddress: '',
		password:  '',
		errors: [],
	}

	change = (e) => {
		const name = e.target.name;
		const value = e.target.value;
	
		this.setState(() => {
		  return {
			  [name]: value,
		  };
		});
  };
  
  submit = () => {
    const { context } = this.props;

    const {
      emailAddress,
      password,
    } = this.state

    context.actions.signIn(emailAddress, password)
      .then(() => {
        this.props.history.push('/authenticated');
      })
      .catch( err => {
        console.log(err);
        this.props.history.push('/error');
      });
  };

  cancel = () => {
    this.props.history.push('/');
  };

	render() {

    const {
      emailAddress,
      password,
      errors,
    } = this.state;

    return (
      <div className="bounds">
        <div className="grid-33 centered signin">
          <h1>Sign In</h1>
          <div>
            <Form
              cancel={this.cancel}
              errors={errors}
              submit={this.submit}
              submitButtonText="Sign In"
              elements={() => (
                <React.Fragment>
                  <input 
                    id="emailAddress" 
                    name="emailAddress" 
                    type="text"
                    value={emailAddress} 
                    onChange={this.change} 
                    placeholder="Email Address" />
                  <input 
                    id="password" 
                    name="password"
                    type="password"
                    value={password} 
                    onChange={this.change} 
                    placeholder="Password" />
                </React.Fragment>
              )}
            />
          </div>
          <p>&nbsp;</p>
          <p>Don't have a user account? <Link to="/signup">Click here</Link> to sign up!</p>
        </div>
      </div>
    )
  }
}

export default UserSignIn;