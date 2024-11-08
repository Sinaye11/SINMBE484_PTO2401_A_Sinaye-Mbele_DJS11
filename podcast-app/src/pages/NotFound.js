// src/pages/NotFound.js

// NotFound Component
// This page displays a 404 error message when the user navigates to a non-existent route.

import React from 'react';

const NotFound = () => {
  return (
    <div className="not-found">
      <h1>404 - Page Not Found</h1> {/* Main title for the 404 error */}
      <p>The page you are looking for does not exist.</p> {/* Informative message for the user */}
      <a href="/" className="back-home-link">Go back to Home</a> {/* Link for easy navigation back to the homepage */}
    </div>
  );
};

export default NotFound;
