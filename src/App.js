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
    initialTerms: ['coffee', 'books', 'computers'],
    search: { }
  }

  searchFor = term => {
    fetch(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${term}&per_page=24&sort=relevance&format=json&nojsoncallback=1`)
      .then(response => response.json())
      .then(data => (
        this.state.initialTerms.includes(term)
        ? this.setState(prevState => ({ [term]: data.photos.photo }) )
        : this.setState(prevState => ({ search: { [term]: data.photos.photo } }) )
      ));
  }

  componentDidMount() {
    this.state.initialTerms.forEach( term => this.searchFor(term) );
  }
  
  render() {
    return (
      <BrowserRouter>
        <div className="container">
          <SearchForm searchFor={this.searchFor} />
          <MainNav terms={this.state.initialTerms} />
        </div>
        <Switch>
          <Route exact path="/" />
          {this.state.initialTerms.map((term, index) => (
            <Route path={`/${term}`} key={index} render={props => <PhotoContainer title={term} photos={this.state[term]} />} />
          ))}
          <Route path={'/search/:term'} render={props => <PhotoContainer title={props.match.params.term} photos={this.state.search[props.match.params.term]} />} />
          <Route component={PhotoContainer} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;