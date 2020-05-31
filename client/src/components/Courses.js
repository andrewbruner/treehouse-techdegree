import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import config from '../utils/config';

export default class Courses extends Component {

  // Local State
  state = {
    courses: [],
  };

  // Get Courses
  getCourses = () => {
    const { context } = this.props;

    context.actions.getCourses()

      .then(courses => {
        this.setState(() => ({ courses: courses }));
      })

      .catch(err => {
        console.log(err);
        this.props.history.push('/error');
      });
  }

  // Component Did Mount
  componentDidMount() {
    this.getCourses();
  }

  render() {
    let key = 0;
    return (
      <div className="bounds">
        {this.state.courses.map(course => {
          key++;
          return (
            <div key={key} className="grid-33">
              <Link className="course--module course--link" to={`/courses/${course.id}`}>
                <h4 className="course--label">Course</h4>
                <h3 className="course--title">{course.title}</h3>
              </Link>
            </div>
          );
        })}
        <div className="grid-33">
          <Link className="course--module course--add--module" to="courses/create">
            <h3 className="course--add--title">
              <svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 13 13" className="add">
                <polygon points="7,6 7,0 6,0 6,6 0,6 0,7 6,7 6,13 7,13 7,7 13,7 13,6 "></polygon>
              </svg>
              New Course
            </h3>
          </Link>
        </div>
      </div>
    );
  }
};