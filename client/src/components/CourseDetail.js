import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import config from '../utils/config';

export default class CourseDetail extends Component {

    state = {
      courseDetail: [],
      courseUser: [],
      errors: [],
    }

    async readCourseDetail() {
      await fetch(`${config.apiBaseUrl}/api/courses/${this.state.courseDetail.id}`)
        .then(response => response.json())
        .then(data => this.setState({ courseDetail: data, courseUser: data.user }))
        .catch(err => console.error('Error: ', err))
    }

    deleteCourse() {
      this.props.context.data.deleteCourse(`${config.apiBaseUrl}/api/courses/${this.state.courseDetail.id}`, this.props.context.authenticatedUser.emailAddress, this.props.context.authenticatedUser.password)
      .then( errors => {
        if (errors.length) {
          this.setState({ errors });
        } else {
          this.props.history.push('/');
        }
      })
      .catch( err => {
        console.log(err);
        this.props.history.push('/error');
      });
    }

    componentDidMount() {
      this.readCourseDetail();
    }

    render() {
      return (
        <div>
          <div className="actions--bar">
            <div className="bounds">
              <div className="grid-100">
                <span>
                  <Link className="button" to={`/courses/${this.state.courseDetail.id}/update`}>Update Course</Link>
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
                <h3 className="course--title">{this.state.courseDetail.title}</h3>
                <p>{this.state.courseUser.firstName} {this.state.courseUser.lastName}</p>
              </div>
              <div className="course--description">
                <p>{this.state.courseDetail.description}</p>
              </div>
            </div>
            <div className="grid-25 grid-right">
              <div className="course--stats">
                <ul className="course--stats--list">
                  <li className="course--stats--list--item">
                    <h4>Estimated Time</h4>
                    <h3>{this.state.courseDetail.estimatedTime}</h3>
                  </li>
                  <li className="course--stats--list--item">
                    <h4>Materials Needed</h4>
                    <ul>
                      <li>{this.state.courseDetail.materialsNeeded}</li>
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

