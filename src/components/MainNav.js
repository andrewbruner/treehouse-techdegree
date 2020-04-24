import React from 'react';
import { NavLink } from 'react-router-dom';

const MainNav = (props) => (
  <nav className="main-nav">
    <ul>
      {props.terms.map( (term, index) => (
        <li key={index}>
          <NavLink to={`/${term}`}>
            {`${term.charAt(0).toUpperCase()}${term.slice(1)}`}
          </NavLink>
        </li>
      ))}
    </ul>
  </nav>
);

export default MainNav;