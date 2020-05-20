import React, { Component } from 'react';

class UpdateCourse extends Component {
  state = {
    courseDetail: { user: { } }
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
      <div className="bounds course--detail">
        <h1>Update Course</h1>
        <div>
          <form>
            <div className="grid-66">
              <div className="course--header">
                <h4 className="course--label">Course</h4>
                <div>
                  <input id="title" name="title" type="text" className="input-title course--title--input" placeholder="Course title..." value={this.state.courseDetail.title} />
                </div>
                <p>By {this.state.courseDetail.user.firstName} {this.state.courseDetail.user.lastName}</p>
              </div>
              <div className="course--description">
                <div>
                  <textarea id="description" name="description" className="" placeholder="Course description...">{this.state.courseDetail.description}</textarea>
                </div>
              </div>
            </div>
            <div className="grid-25 grid-right">
              <div className="course--stats">
                <ul className="course--stats--list">
                  <li className="course--stats--list--item">
                    <h4>Estimated Time</h4>
                    <div>
                      <input id="estimatedTime" name="estimatedTime" type="text" className="course--time--input" placeholder="Hours" value={this.state.courseDetail.estimatedTime} />
                    </div>
                  </li>
                  <li className="course--stats--list--item">
                    <h4>Materials Needed</h4>
                    <div>
                      <textarea id="materialsNeeded" name="materialsNeeded" className="" placeholder="List materials...">{this.state.courseDetail.materialsNeeded}</textarea>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            <div className="grid-100 pad-bottom">
              <button className="button" type="submit">Update Course</button>
              <button className="button button-secondary" onclick={`event.preventDefault(); location.href='/courses/${this.state.courseDetail.id}`}>Cancel</button>
            </div>
          </form>
        </div>
      </div>
    )
  }
}

export default UpdateCourse;