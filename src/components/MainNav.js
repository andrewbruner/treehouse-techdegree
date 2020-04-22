import React from 'react';
import { NavLink } from 'react-router-dom';

const MainNav = () => (
  <nav className="main-nav">
    <ul>
      <li><NavLink to="/coffee">Coffee</NavLink></li>
      <li><NavLink to="/books">Books</NavLink></li>
      <li><NavLink to="/computers">Computers</NavLink></li>
    </ul>
  </nav>
);

export default MainNav;