import React, { Component } from 'react';
import './css/index.css'
import apiKey from './config.js'

import SearchForm from './components/SearchForm';
import MainNav from './components/MainNav';
import PhotoContainer from './components/PhotoContainer';

class App extends Component {
  state = {
    photos: []
  }

  searchTerm = 'sunsets'

  componentDidMount() {
    fetch(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${this.searchTerm}&per_page=24&format=json&nojsoncallback=1`)
      .then(res => res.json())
      .then(data => {
        const photos = data.photos.photo;
        const pics = [];
        photos.forEach(photo => {
          const pic = {};
          pic.farm = photo.farm;
          pic.server = photo.server;
          pic.id = photo.id;
          pic.secret = photo.secret;
          pics.push(pic);
        });
        this.setState(prevState => {
          return { photos: pics }
        })
      });
  }
  
  render() {
    return (
      <div className="container">
        <SearchForm />
        <MainNav />
        <PhotoContainer />
      </div>
    );
  }
}

export default App;

// https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=5fd1f7388e03cce8d1b7d3ffbc6872ec&tags=sunsets&per_page=&format=json&nojsoncallback=1