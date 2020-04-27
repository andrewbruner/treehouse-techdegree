import React, { Component } from 'react';

import Photo from './Photo';
import NotFound from './NotFound';

class PhotoContainer extends Component {

  render() {
    return (
      <div className="photo-container">
        <h2>{this.props.title.toUpperCase()}</h2>
        <ul>
          {
            // If PhotoContainer has data...
            this.props.data ? (
              // And if data.length is greater than 0...
              this.props.data.length > 0 ? (
                // Render a Photo for each photo
                this.props.data.map(photo => (
                  <Photo key={photo.id} photo={photo} />
                ))
              // Else render SEARCH RESULTS not found
              ) : (
                <NotFound />
              )
            // Else render PAGE not found
            ) : (
              <h1>Page Not Found</h1>
            )
          }
        </ul>
      </div>
    )
  }
}

export default PhotoContainer;