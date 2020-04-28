import React from 'react';
import { NavLink } from 'react-router-dom';

const MainNav = (props) => (
  <nav className="main-nav">
    <ul>
      <li>
        <NavLink to="/coffee">
          {`${props.title[0].charAt(0).toUpperCase()}${props.title[0].slice(1)}`}
        </NavLink>
      </li>
      <li>
        <NavLink to="/books">
          {`${props.title[1].charAt(0).toUpperCase()}${props.title[1].slice(1)}`}
        </NavLink>
      </li>
      <li>
        <NavLink to="/computers">
          {`${props.title[2].charAt(0).toUpperCase()}${props.title[2].slice(1)}`}
        </NavLink>
      </li>
    </ul>
  </nav>
);

export default MainNav;