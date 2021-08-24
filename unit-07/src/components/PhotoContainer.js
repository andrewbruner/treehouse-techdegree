import React, { Component } from 'react';

import Loading from './Loading';
import Photo from './Photo';
import NotFound from './NotFound';
import PageNotFound from './PageNotFound';

class PhotoContainer extends Component {

  render() {
    return (
      <div className="photo-container">
        <h2>{this.props.title.toUpperCase()}</h2>
        <ul>
          {
            // Is the state loading?
            this.props.loading
              // Yes: Render Loading
              ? <Loading />
              // No: Is there data?
              : this.props.data
                // Yes: Is data length greater than 0?
                ? this.props.data.length > 0
                  // Yes: Render Photo components
                  ? this.props.data.map(photo => <Photo key={photo.id} photo={photo} />)
                  // No: Render NotFound
                  : <NotFound />
                // No: Render PageNotFound
                : <PageNotFound />
          }
        </ul>
      </div>
    )
  }
}

export default PhotoContainer;