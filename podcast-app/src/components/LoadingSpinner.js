// src/components/LoadingSpinner.js

import React from 'react';
import './LoadingSpinner.css'; // Import CSS for spinner styling

/**
 * LoadingSpinner Component
 * 
 * Displays a loading spinner, typically used while data is being fetched.
 */
const LoadingSpinner = () => {
  return (
    <div className="spinner-container">
      <div className="spinner"></div> {/* Spinner element styled in CSS */}
    </div>
  );
};

export default LoadingSpinner;
