import React from 'react';
import { Link } from 'react-router-dom';
import './StarWarsTheme.css';

function NavBar() {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/planets">Planet Catalog</Link>
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
