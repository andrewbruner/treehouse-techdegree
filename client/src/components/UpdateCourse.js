import React, { Component } from 'react';
import Form from './Form';

class UpdateCourse extends Component {

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
  };

  // Get Course Detail
  getCourseDetail = () => {

    // context
    const { context } = this.props;
    
    // course id
    const { id } = this.props.match.params;

    context.actions.getCourseDetail(id)

      .then(courseDetail => {
        this.setState(() => ({
          courseDetail: courseDetail,
          title: courseDetail.title,
          description: courseDetail.description,
          estimatedTime: courseDetail.estimatedTime,
          materialsNeeded: courseDetail.materialsNeeded,
        }));
      })

      .catch(err => {
        console.error(err);
        this.props.history.push('/error');
      });
  };

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

    context.actions.updateCourse(id, course, emailAddress, password)

      .then(data => {

        // returned error(s)
        if (data.length > 0) {
          this.setState(() => ({ errors: data }));
        
        // returned course object
        } else {
          this.props.history.push(`/courses/${id}`);
        }
      })

      .catch(err => {
        console.log(err);
        this.props.history.push('/error');
      });
  };

  // Cancel
  cancel = () => {

    // course id
    const { id } = this.props.match.params;

    this.props.history.push(`/courses/${id}`);
  };

  // Component Did Mount
  componentDidMount() {
    this.getCourseDetail();
  }

  render() {

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
}

export default UpdateCourse;