import React from 'react';
import './App.css';
import './css/index.css'

import SearchForm from './components/SearchForm';
import MainNav from './components/MainNav';

const App = () => (
  <div className="container">
    <SearchForm />
    <MainNav />
  </div>
);

export default App;
