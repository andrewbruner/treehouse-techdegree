import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import './css/index.css'
import apiKey from './config.js'

import SearchForm from './components/SearchForm';
import MainNav from './components/MainNav';
import PhotoContainer from './components/PhotoContainer';

class App extends Component {

  state = {
    photos: {
      coffee: [],
      books: [],
      computers: [],
      search: []
    }
  }

  searchFor = searchTerm => {
    fetch(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${searchTerm}&per_page=24&sort=relevance&format=json&nojsoncallback=1`)
      .then(response => response.json())
      .then(data => {
        const photos = data.photos.photo;
        const pics = [];
        let key = 1;
        photos.forEach(photo => {
          const pic = {};
          pic.key = key;
          key++;
          pic.farm = photo.farm;
          pic.server = photo.server;
          pic.id = photo.id;
          pic.secret = photo.secret;
          pics.push(pic);
        });
        this.setState(prevState => {
            const photos = { ...prevState.photos };
            photos[searchTerm] = pics;
          return { photos };
        });
      });
  }

  componentDidMount() {
    this.searchFor('coffee');
    this.searchFor('books');
    this.searchFor('computers');
  }
  
  render() {
    return (
      <BrowserRouter>
        <div className="container">
          <SearchForm />
          <MainNav />
        </div>
        <Switch>
          <Route exact path="/">

          </Route>
          <Route path="/coffee">
            <PhotoContainer photos={this.state.photos.coffee}/>
          </Route>
          <Route path="/books">
            <PhotoContainer photos={this.state.photos.books}/>
          </Route>
          <Route path="/computers">
            <PhotoContainer photos={this.state.photos.computers}/>
          </Route>
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;