import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import config from '../utils/config';

export default class CourseDetail extends Component {

  // Local State
  state = {
    courseDetail: [],
    errors: [],
  }

  // Get Course Detail
  getCourseDetail = () => {

    // context
    const { context } = this.props;
    
    // course id
    const { id } = this.props.match.params;

    context.actions.getCourseDetail(id)

      .then(courseDetail => {
        this.setState(() => ({ courseDetail: courseDetail }));
      })

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
    
    context.actions.deleteCourse(id, emailAddress, password)

      .then( error => {

        if (error?.length > 0) {
          this.setState(() => ({ errors: error }));
          this.props.history.push('/forbidden');
        
        } else {
          this.props.history.push('/');
        }
      })

      .catch(err => {
        console.error(err);
        this.props.history.push('/error');
      });
  }

  // Component Did Mount
  componentDidMount() {
    this.getCourseDetail();
  }

  render() {
    const { courseDetail } = this.state;

    return (
      <div>
        <div className="actions--bar">
          <div className="bounds">
            <div className="grid-100">
              <span>
                <Link className="button" to={`/courses/${courseDetail?.id}/update`}>Update Course</Link>
                <Link className="button" to="/" onClick={() => this.deleteCourse()}>Delete Course</Link>
              </span>
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
              <p>{courseDetail?.description}</p>
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
                  <ul>
                    <li>{courseDetail?.materialsNeeded}</li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

