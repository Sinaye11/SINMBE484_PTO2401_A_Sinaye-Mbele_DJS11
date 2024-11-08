// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client'; // React 18: use createRoot API for rendering
import App from './App'; // Import the main App component
import { FavouritesProvider } from './context/FavouritesContext'; // Import the context provider for managing favourites
import './index.css'; // Import global styles for the application

// Create the root element where the app will be rendered
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render the application inside the root element
root.render(
  <React.StrictMode>
    {/* Wrap the App component in FavouritesProvider to manage the global favourites state */}
    <FavouritesProvider>
      <App /> {/* Main application component */}
    </FavouritesProvider>
  </React.StrictMode>
);
