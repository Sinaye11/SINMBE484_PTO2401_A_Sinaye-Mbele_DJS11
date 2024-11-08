// src/components/Sidebar.js
import React from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../assets/logo.png'; // Update this path to your logo
import './Sidebar.css'; // Ensure this path is correct

const Sidebar = () => {
  return (
    <nav className="sidebar">
      {/* Logo and Title Container */}
      <div className="logo-container">
        <img src={logo} alt="Logo" className="logo" />
        <h1 className="sidebar-title">Podcast App</h1> {/* Title of the application */}
      </div>

      <NavLink to="/" className="nav-link" activeClassName="active" exact>
        Home
      </NavLink>
      <NavLink to="/favourites" className="nav-link" activeClassName="active">
        Favourites
      </NavLink>
      {/* Add more navigation links as needed */}
    </nav>
  );
};

export default Sidebar;
