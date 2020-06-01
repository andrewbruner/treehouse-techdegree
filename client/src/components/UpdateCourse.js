// Depenedencies
import React, { Component } from 'react';
import Form from './Form';

// Update Course
export default class UpdateCourse extends Component {

  // Local State
  state = {
    courseDetail: [],
    title: '',
    description: '',
    estimatedTime: '',
    materialsNeeded: '',
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

  // Get Course Detail
  getCourseDetail = () => {

    // context
    const { context } = this.props;
    
    // course id
    const { id } = this.props.match.params;

    // api call
    context.actions.getCourseDetail(id)

      // returned value
      .then(courseDetail => {

        // course not found
        if (courseDetail === null) {
          this.props.history.push('/notfound');

        // forbidden
        } else if (courseDetail?.Userid !== context.authenticatedUser?.id) {
          this.props.history.push('/forbidden');

        // local state update
        } else {
          this.setState(() => ({
            courseDetail: courseDetail,
            title: courseDetail.title,
            description: courseDetail.description,
            estimatedTime: courseDetail.estimatedTime,
            materialsNeeded: courseDetail.materialsNeeded,
          }));
        }
      })

      // unhandled errors
      .catch(err => {
        console.error(err);
        this.props.history.push('/error');
      });
  }

  // Submit
  submit = () => {

    // context
    const { context } = this.props;

    // authenticated user
    const { authenticatedUser } = context

    // course id
    const id = this.props.match.params;

    // input fields
    const {
      title,
      description,
      estimatedTime,
      materialsNeeded,
    } = this.state

    // course
    const course = {
      title,
      description,
      estimatedTime,
      materialsNeeded,
    };

    // credentials
    const {
      emailAddress,
      password,
    } = authenticatedUser;

    // api call
    context.actions.updateCourse(id, course, emailAddress, password)

      // returned value
      .then(errors => {

        // validation errors
        if (errors.length) {
          this.setState(() => ({ errors: errors }));
        
        // redirect
        } else {
          this.props.history.push(`/courses/${id}`);
        }
      })

      // unhandled errors
      .catch(err => {
        console.log(err);
        this.props.history.push('/error');
      });
  }

  // Cancel
  cancel = () => {
    const { id } = this.props.match.params;
    this.props.history.push(`/courses/${id}`);
  }

  // Component Did Mount
  componentDidMount() {
    this.getCourseDetail();
  }

  // Render
  render() {

    // local varible access
    const {
      title,
      description,
      estimatedTime,
      materialsNeeded,
      errors,
    } = this.state;

    const {
      firstName,
      lastName,
    } = this.props.context.authenticatedUser;

    // render
    return (
      <div className="bounds course--detail">
        <h1>Update Course</h1>
        <div>
          <Form
            cancel={this.cancel}
            errors={errors}
            submit={this.submit}
            submitButtonText="Update Course"
            elements={() => (
              <React.Fragment>
                <div className="grid-66">
                  <div className="course--header">
                    <h4 className="course--label">Course</h4>
                    <div>
                      <input
                        id="title"
                        name="title"
                        type="text"
                        className="input-title course--title--input"
                        placeholder="Course title..."
                        value={title}
                        onChange={this.change}
                      />
                    </div>
                    <p>By {firstName} {lastName}</p>
                  </div>
                  <div className="course--description">
                    <div>
                      <textarea
                        id="description"
                        name="description"
                        className=""
                        placeholder="Course description..."
                        value={description}
                        onChange={this.change}
                      >
                      </textarea>
                    </div>
                  </div>
                </div>
                <div className="grid-25 grid-right">
                  <div className="course--stats">
                    <ul className="course--stats--list">
                      <li className="course--stats--list--item">
                        <h4>Estimated Time</h4>
                        <div>
                          <input
                            id="estimatedTime"
                            name="estimatedTime" 
                            type="text" 
                            className="course--time--input" 
                            placeholder="Hours" 
                            value={estimatedTime}
                            onChange={this.change}
                          />
                        </div>
                      </li>
                      <li className="course--stats--list--item">
                        <h4>Materials Needed</h4>
                        <div>
                          <textarea
                            id="materialsNeeded" 
                            name="materialsNeeded" 
                            className="" 
                            placeholder="List materials..."
                            value={materialsNeeded}
                            onChange={this.change}
                          >
                          </textarea>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </React.Fragment>
            )}
          />
        </div>
      </div>
    )
  }
};