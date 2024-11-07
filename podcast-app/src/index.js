import React from 'react';
import ReactDOM from 'react-dom/client'; // React 18: createRoot API for rendering
import App from './App'; // Import the App component
import { FavouritesProvider } from './context/FavouritesContext'; // Import FavouritesProvider
import './index.css'; // Import global styles

// Creates the root element where the app will be rendered
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render the app inside the root element
root.render(
  <React.StrictMode>
    {/* Wrap the App in FavouritesProvider to manage global favourites state */}
    <FavouritesProvider>
      <App />
    </FavouritesProvider>
  </React.StrictMode>
);


