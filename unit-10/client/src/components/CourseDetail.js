// Depenedencies
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';

// Course Detail
export default class CourseDetail extends Component {

  // Local State
  state = {
    courseDetail: [],
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

        // local state update
        } else {
          this.setState(() => ({ courseDetail: courseDetail }));
        }
      })

      // unhandled errors
      .catch(err => {
        console.error(err);
        this.props.history.push('/error');
      });
  }

  // Delete Course
  deleteCourse = () => {

    // context
    const { context } = this.props;

    // course id
    const { id } = this.props.match.params;

    // credentials
    const emailAddress = context.authenticatedUser?.emailAddress;
    const password = context.authenticatedUser?.password;
    
    // api call
    context.actions.deleteCourse(id, emailAddress, password)

      // redirect after deletion
      .then(data => {
        this.props.history.push('/');
      })

      // unhandled error
      .catch(err => {
        console.error(err);
        this.props.history.push('/error');
      });
  }

  // Component Did Mount
  componentDidMount() {
    this.getCourseDetail();
  }

  // Render
  render() {

    // local variable access
    const { courseDetail } = this.state;
    const { authenticatedUser } = this.props.context;

    // authorized user actions setup
    let actions = null;
    const UserActions = () => {
      return actions;
    };
    if (authenticatedUser && authenticatedUser?.id === courseDetail?.user?.id) {
      actions = (
        <span>
          <Link className="button" to={`/courses/${courseDetail?.id}/update`}>Update Course</Link>
          <button type="button" className="button" onClick={() => this.deleteCourse()}>Delete Course</button>
        </span>
      ); 
    }

    // render
    return (
      <div>
        <div className="actions--bar">
          <div className="bounds">
            <div className="grid-100">
              <UserActions />
              <Link className="button button-secondary" to="/">Return to List</Link>
            </div>
          </div>
        </div>
        <div className="bounds course--detail">
          <div className="grid-66">
            <div className="course--header">
              <h4 className="course--label">Course</h4>
              <h3 className="course--title">{courseDetail?.title}</h3>
              <p>{courseDetail?.user?.firstName} {courseDetail?.user?.lastName}</p>
            </div>
            <div className="course--description">
              <ReactMarkdown source={courseDetail?.description} />
            </div>
          </div>
          <div className="grid-25 grid-right">
            <div className="course--stats">
              <ul className="course--stats--list">
                <li className="course--stats--list--item">
                  <h4>Estimated Time</h4>
                  <h3>{courseDetail?.estimatedTime}</h3>
                </li>
                <li className="course--stats--list--item">
                  <h4>Materials Needed</h4>
                  <ReactMarkdown source={courseDetail?.materialsNeeded} />
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
};
