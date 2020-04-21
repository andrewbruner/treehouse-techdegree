import React from 'react';
import './App.css';
import './css/index.css'

import SearchForm from './components/SearchForm';
import MainNav from './components/MainNav';
import PhotoContainer from './components/PhotoContainer';

const App = () => (
  <div className="container">
    <SearchForm />
    <MainNav />
    <PhotoContainer />
  </div>
);

export default App;
