// dependencies
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Form from './Form';

// export UserSignUp class component
export default class UserSignUp extends Component {

  // initiate local state
  state = {
    firstName: '',
    lastName: '',
    emailAddress: '',
    password: '',
    confirmPassword: '',
    errors: [],
  }

  // local state change function
  change = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    this.setState(() => {
      return {
        [name]: value,
      };
    });
  }

  // local submit function
  submit = () => {

    // destructure context from props
    const { context } = this.props;

    // destructure input field values from local state
    const {
      firstName,
      lastName,
      emailAddress,
      password,
      confirmPassword,
    } = this.state

    // define user from input field values
    const user = {
      firstName,
      lastName,
      emailAddress,
      password,
    };

    // check of passwords match
    if (password === confirmPassword) {
      // create user (using data access) then sign in user
      context.data.createUser(user)
        .then( errors => {
          if (errors.length) {
            this.setState({ errors });
          } else {
            context.actions.signIn(emailAddress, password)
              .then(() => {
                this.props.history.push('/authenticated');
              });
          }
        })
        .catch( err => {
          console.log(err);
          this.props.history.push('/error');
        });
    } else {
      this.setState({ errors: 'Passwords do not match' });
    }
  }

  // local cancel function
  cancel = () => {
    this.props.history.push('/');
  }
  
  render() {

    // destructure input values from local state for Form component
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
                  type="confirmPassword"
                  value={confirmPassword} 
                  onChange={this.change} 
                  placeholder="Confirm Password" />
              </React.Fragment>
            )} />
            <p>&nbsp;</p>
            <p>Already have a user account? <Link to="/signin">Click here</Link> to sign in!</p>
        </div>
      </div>
    );
  }

}
