import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Form from './Form';

export default class UserSignUp extends Component {
  state = {
    firstName: '',
    lastName: '',
    emailAddress: '',
    password: '',
    errors: [],
  }

  render() {
    const {
      firstName,
      lastName,
      emailAddress,
      password,
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
              </React.Fragment>
            )} />
            <p>&nbsp;</p>
            <p>Already have a user account? <a href="/signin">Click here</a> to sign in!</p>
        </div>
      </div>
    );
  }

  change = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    this.setState(() => {
      return {
        [name]: value
      };
    });
  }

  submit = () => {
    // destructure props
    const { context } = this.props;

    // destructure state
    const {
      firstName,
      lastName,
      emailAddress,
      password,
    } = this.state

    // initialize new user payload
    const user = {
      firstName,
      lastName,
      emailAddress,
      password,
    };

    // create a user
    context.data.createUser(user)
      // the API may return errors for some reason
      .then( errors => {
        // if the return value (errors) has length...
        if (errors.length) {
          // set errors state of UserSignUp class
          this.setState({ errors });
        } else {
          // else log a success message to the console
          console.log(`${username} is successfully signed up and authenticated!`);
        }
      })
      // if the Promise is rejected...
      .catch( err => {
        // log the error to the console
        console.log(err);
        // push to history stack (redirect to /error aka 404:NotFound)
        this.props.history.push('/error');
      });
  }

  cancel = () => {
    // push to history stack (redirect to home route)
    this.props.history.push('/');
  }
}