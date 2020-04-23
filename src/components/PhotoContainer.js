import React from 'react';

import Photo from './Photo';

const PhotoContainer = props => (
  <div className="photo-container">
    <h2>{props.title}</h2>
    <ul>
      {props.photos.map(photo => (
        <Photo key={photo.id} photo={photo} />
      ))}
    </ul>
  </div>
);

export default PhotoContainer;