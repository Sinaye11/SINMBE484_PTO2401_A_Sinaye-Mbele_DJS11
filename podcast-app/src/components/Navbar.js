// src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom'; // Using React Router for navigation

const Navbar = () => {
  return (
    <nav className="navbar">
      <ul>
        <li><Link to="/">Home</Link></li> {/* Home link */}
        <li><Link to="/favourites">Favourites</Link></li> {/* Favourites link */}
      </ul>
    </nav>
  );
};

export default Navbar;
