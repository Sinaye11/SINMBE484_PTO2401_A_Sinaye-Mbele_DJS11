// src/components/Sidebar.js

/**
 * Sidebar Component
 * 
 * Purpose:
 * This component represents the sidebar navigation menu for the Podcast App. 
 * It includes a logo, app title, and navigation links to different parts of the application.
 * 
 * Usage:
 * - Displays the main navigation links for the user to navigate between pages (e.g., Home, Favourites).
 * - Includes visual styling via Sidebar.css to align with the app’s UI.
 */

import React from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../assets/logo.png'; // Import app logo image
import './Sidebar.css'; // Import styling specific to Sidebar component

const Sidebar = () => {
  return (
    <nav className="sidebar">
      {/* Logo and Title Section */}
      <div className="logo-container">
        <img src={logo} alt="Logo" className="logo" /> {/* App logo */}
        <h1 className="sidebar-title">Podcast App</h1> {/* App title */}
      </div>

      {/* Navigation Links */}
      <NavLink 
        to="/" 
        className="nav-link" 
        activeClassName="active" 
        exact
      >
        Home
      </NavLink>
      <NavLink 
        to="/favourites" 
        className="nav-link" 
        activeClassName="active"
      >
        Favourites
      </NavLink>
      
      {/* Additional navigation links can be added here as the app expands */}
    </nav>
  );
};

export default Sidebar;

