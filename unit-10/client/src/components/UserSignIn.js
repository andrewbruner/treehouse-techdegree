// Dependencies
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Form from './Form';

// User Sign In
export default class UserSignIn extends Component {

  // Local State
	state = {
		emailAddress: '',
		password:  '',
		errors: [],
	}

  // Local State Change
	change = (e) => {
		const name = e.target.name;
		const value = e.target.value;

		this.setState(() => {
		  return {
			  [name]: value,
		  };
    });
  }
  
  // Submit
  submit = () => {

    // context
    const { context } = this.props;

    // input fields
    const {
      emailAddress,
      password,
    } = this.state

    // api call
    context.actions.signIn(emailAddress, password)

      // returned value
      .then(errors => {

        // validation errors
        if (errors.length) {
          this.setState(() => ({ errors: errors }));
        
        // redirect
        } else {
          const prevLocation = this.props.location.state?.from.pathname;
          const redirect = prevLocation || '/';
          this.props.history.push(redirect);
        }
      })

      // unhandled errors
      .catch(err => {
        console.error(err);
        this.props.history.push('/error');
      });
  }

  // Cancel
  cancel = () => {
    this.props.history.push('/');
  }

  // Render
	render() {

    // local variable access
    const {
      emailAddress,
      password,
      errors,
    } = this.state;

    // render
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
};