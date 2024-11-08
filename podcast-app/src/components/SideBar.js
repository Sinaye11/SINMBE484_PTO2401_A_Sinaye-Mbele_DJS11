// src/components/Sidebar.js
import React from 'react';
import { NavLink } from 'react-router-dom';
import './Sidebar.css'; // Ensure this path is correct and the file exists

const Sidebar = () => {
  return (
    <nav className="sidebar">
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
