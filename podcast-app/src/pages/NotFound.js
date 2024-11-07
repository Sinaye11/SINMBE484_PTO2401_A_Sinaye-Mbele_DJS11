//404 page for unmatched routes

// NotFound page, displayed when the user navigates to a non-existent route

import React from 'react'; // Import React

const NotFound = () => {
  return (
    <div className="not-found">
      <h1>404 - Page Not Found</h1> {/* Title indicating the page was not found */}
      <p>The page you are looking for does not exist.</p> {/* Message explaining the error */}
      <a href="/" className="back-home-link">Go back to Home</a> {/* Link to navigate back to the homepage */}
    </div>
  );
};

export default NotFound;
