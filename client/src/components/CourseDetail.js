import React, { Component } from 'react';

class CourseDetail extends Component {
    state = {
        courseDetail: []
    }

    readCourseDetail = () => {
        fetch(`${this.props.host}/api/courses/${this.props.id}`)
            .then(response => response.json())
            .then(data => this.setState({ courseDetail: data }))
            .catch(err => console.error('Error: ', err))
    }

    componentDidMount() {
        this.readCourseDetail();
    }

    render() {
        return (
            <div>
        <div className="actions--bar">
          <div className="bounds">
            <div className="grid-100"><span><a className="button" href="">Update Course</a><a className="button" href="#">Delete Course</a></span><a
                className="button button-secondary" href="">Return to List</a></div>
          </div>
        </div>
        <div className="bounds course--detail">
          <div className="grid-66">
            <div className="course--header">
              <h4 className="course--label">Course</h4>
        <h3 className="course--title">{this.state.courseDetail.title}</h3>
              <p>{`${this.state.courseDetail.user.firstName} ${this.state.courseDetail.user.lastName}`}</p>
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
                  <h3>{this.state.CourseDetail.estimatedTime}</h3>
                </li>
                <li className="course--stats--list--item">
                  <h4>Materials Needed</h4>
                  <ul>
                    <li>{this.state.CourseDetail.materialsNeeded}</li>
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

export default CourseDetail;