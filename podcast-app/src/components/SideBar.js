import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <img src={logo} alt="App Logo" className="sidebar-logo" />
      <h2>Podcast App</h2>
      <ul>
        <li><Link to="/" aria-label="Home">Home</Link></li>
        <li><Link to="/favourites" aria-label="Favourites">Favourites</Link></li>
        <li><Link to="/genres" aria-label="Genres">Genres</Link></li>
      </ul>
    </div>
  );
};

export default Sidebar;
