import React from 'react';
import ReactDOM from 'react-dom/client'; // React 18: createRoot API for rendering
import App from './App'; // Import the App component
import { FavouritesContext } from './context/FavouritesContext'; // Import FavouritesContext for global state management
import './index.css'; // Import global styles

// Creates the root element where the app will be rendered
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render the app inside the root element
root.render(
  <React.StrictMode>
    {/* Wrap the App in FavouritesContext.Provider to manage global favourites state */}
    <FavouritesContext.Provider value={{}}>
      <App />
    </FavouritesContext.Provider>
  </React.StrictMode>
);

