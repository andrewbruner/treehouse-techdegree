// Dependencies
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Form from './Form';

// UserSignUp
export default class UserSignUp extends Component {

  // Local State
  state = {
    firstName: '',
    lastName: '',
    emailAddress: '',
    password: '',
    confirmPassword: '',
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
      firstName,
      lastName,
      emailAddress,
      password,
      confirmPassword,
    } = this.state;

    // user
    const user = {
      firstName,
      lastName,
      emailAddress,
      password,
    };

    // sign up
    context.actions.signUp(user, confirmPassword)

      .then(errors => {

        // returned error(s)
        if (errors.length > 0) {
          this.setState(() => ({ errors: errors }));

        // sign in
        } else {
          context.actions.signIn(emailAddress, password)
            // redirect
            .then(() => {
              this.props.history.push('/');
            });
        }
      })

      .catch(err => {
        console.error(err);
        this.props.history.push('/error');
      });
  }

  // Cancel
  cancel = () => {
    this.props.history.push('/');
  }
  
  render() {

    const {
      firstName,
      lastName,
      emailAddress,
      password,
      confirmPassword,
      errors,
    } = this.state;

    return (
      <div className="bounds">
        <div className="grid-33 centered signin">
          <h1>Sign Up</h1>
          <Form 
            cancel={this.cancel}
            errors={errors}
            submit={this.submit}
            submitButtonText="Sign Up"
            elements={() => (
              <React.Fragment>
                <input 
                  id="firstName" 
                  name="firstName" 
                  type="text"
                  value={firstName} 
                  onChange={this.change} 
                  placeholder="First Name" />
                <input 
                  id="lastName" 
                  name="lastName" 
                  type="text"
                  value={lastName} 
                  onChange={this.change} 
                  placeholder="Last Name" />
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
                <input 
                  id="confirmPassword" 
                  name="confirmPassword"
                  type="password"
                  value={confirmPassword} 
                  onChange={this.change} 
                  placeholder="Confirm Password" />
              </React.Fragment>
            )}
          />
          <p>&nbsp;</p>
          <p>Already have a user account? <Link to="/signin">Click here</Link> to sign in!</p>
        </div>
      </div>
    );
  }

}
