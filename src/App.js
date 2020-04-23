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
    initialTerms: ['coffee', 'books', 'computers']
  }

  searchFor = term => {
    fetch(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${term}&per_page=24&sort=relevance&format=json&nojsoncallback=1`)
      .then(response => response.json())
      .then(data => {
        if ( term === this.state.initialTerms[0]
          || term === this.state.initialTerms[1]
          || term === this.state.initialTerms[2] ) {
          this.setState(prevState => ({ [term]: data.photos.photo }) );
        } else {
          this.setState(prevState => ({ search: { term, [term]: data.photos.photo } }) );
        }
      });
  }

  componentDidMount() {
    this.state.initialTerms.forEach( term => this.searchFor(term) );
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
          {this.state.initialTerms.map(term => (
            <Route path={`/${term}`}>
              <PhotoContainer title={term.toUpperCase()} photos={this.state[term]} />
            </Route>
          ))}
          <Route path={`/search/${this.state.search.term}`}>
            <PhotoContainer title={this.state.search.term.toUpperCase()} photos={this.state.search[this.state.search.term]} />
          </Route>
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;