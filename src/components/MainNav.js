import React from 'react';
import { NavLink } from 'react-router-dom';

const MainNav = (props) => (
  <nav className="main-nav">
    <ul>
      <li>
        <NavLink to="/coffee">
          {props.title[0].toUpperCase()}
        </NavLink>
      </li>
      <li>
        <NavLink to="/books">
          {props.title[1].toUpperCase()}
        </NavLink>
      </li>
      <li>
        <NavLink to="/computers">
          {props.title[2].toUpperCase()}
        </NavLink>
      </li>
    </ul>
  </nav>
);

export default MainNav;