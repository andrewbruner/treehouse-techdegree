import React, { Component } from 'react';

import Photo from './Photo';
import NotFound from './NotFound';

class PhotoContainer extends Component {

  render() {
    return (
      <div className="photo-container">
        <h2>{this.props.title ? this.props.title.toUpperCase() : null}</h2>
        <ul>
          {this.props.photos ? this.props.photos.map(photo => (
            <Photo key={photo.id} photo={photo} />
          )) : (
            <NotFound />
          )}
        </ul>
      </div>
    )
  }
}

export default PhotoContainer;