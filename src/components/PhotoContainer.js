import React, { Component } from 'react';

import Photo from './Photo';

class PhotoContainer extends Component {
  state = {

  }

  render() {
    return (
      <div className="photo-container">
        <h2>Results</h2>
        <ul>
          {this.props.photos.map(photo => {
            return (
              <Photo key={photo.key} photo={photo} />
            );
          })}
        </ul>
      </div>
    );
  }
}

export default PhotoContainer;