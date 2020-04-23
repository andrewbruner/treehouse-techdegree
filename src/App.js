// Dependencies
import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import './css/index.css'
import apiKey from './config.js'

// Components
import SearchForm from './components/SearchForm';
import MainNav from './components/MainNav';
import PhotoContainer from './components/PhotoContainer';

class App extends Component {

  state = {
    initialSearchTerms: ['coffee', 'books', 'computers']
  }

  searchFor = searchTerm => {
    fetch(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${searchTerm}&per_page=24&sort=relevance&format=json&nojsoncallback=1`)
      .then(response => response.json())
      .then(data => {
        if ( searchTerm === this.state.initialSearchTerms[0]
          || searchTerm === this.state.initialSearchTerms[1]
          || searchTerm === this.state.initialSearchTerms[2] ) {
          this.setState(prevState => ({ [searchTerm]: data.photos.photo }) );
        } else {
          this.setState(prevState => ({ search: { [searchTerm]: data.photos.photo } }) );
        }
      });
  }

  componentDidMount() {
    this.state.initialSearchTerms.forEach( term => this.searchFor(term) );
  }
  
  render() {
    return (
      <BrowserRouter>
        <div className="container">
          <SearchForm searchFor={this.searchFor} />
          <MainNav />
        </div>
        <Switch>
          <Route exact path="/">

          </Route>
          {this.state.initialSearchTerms.map(term => (
            <Route path={`/${term}`}>
              <PhotoContainer title={term.charAt(0).toUpperCase() + term.slice(1)} photos={this.state.photos[term]} />
            </Route>
          ))}
          <Route path={`/search/${this.state.searchTerm}`}>
            <PhotoContainer title={this.state.searchTerm} photos={this.state.photos.search} />
          </Route>
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;