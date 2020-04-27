// Dependencies
import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

// Files
import './css/index.css'
import apiKey from './config.js'

// Components
import SearchForm from './components/SearchForm';
import MainNav from './components/MainNav';
import PhotoContainer from './components/PhotoContainer';

// Main App Component
class App extends Component {

  // Main App State
  state = {
    loading: false,
    coffee: [],
    books: [],
    computers: [],
    searchTerm: '',
    search: []
  }

  // Search for 'term' using Flickr API and Update Main App State
  searchFor = term => {
    this.setState({ loading: true});
    fetch(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${term}&per_page=24&sort=relevance&format=json&nojsoncallback=1`)
      .then(response => response.json())
      .then(data => {
        if ( term === 'coffee' || term === 'books' || term === 'computers' ) {
          this.setState({ [term]: data.photos.photo });
        } else {
          this.setState({ searchTerm: term, search: data.photos.photo })
        }
      })
      .then(this.setState({ loading: false }));
  }

  // Search for Three Initial Terms when Main App Mounts
  componentDidMount() {
    this.searchFor('coffee');
    this.searchFor('books');
    this.searchFor('computers');
  }
  
  // Render Main App
  render() {
    return (
      <BrowserRouter>
        {/* ContainerDiv with SearchForm and MainNav Renders Always */}
        <div className="container">
          <SearchForm searchFor={this.searchFor} />
          <MainNav title={['coffee', 'books', 'computers']} />
        </div>
        {/* Begin Conditional Routing */}
        <Switch>
          <Route exact path="/" />
          <Route path="/coffee"         render={props => <PhotoContainer title="coffee"                data={this.state.coffee}    />} />
          <Route path="/books"          render={props => <PhotoContainer title="books"                 data={this.state.books}     />} />
          <Route path="/computers"      render={props => <PhotoContainer title="computers"             data={this.state.computers} />} />
          <Route path={'/search/:term'} render={props => <PhotoContainer title={this.state.searchTerm} data={this.state.search}    />} />
          <Route                        render={props => <PhotoContainer title="404"                                               />} />
        </Switch>
      </BrowserRouter>
    );
  }
}

// Export Main App
export default App;