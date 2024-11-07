import React, { useEffect, useState } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css'; // Import global styles
import { FavouritesContext } from './context/FavouritesContext'; // Import FavouritesContext for global state
import Favourites from './pages/Favourites'; // Import the Favourites page component
import Home from './pages/Home'; // Import the Home component
import NotFound from './pages/NotFound'; // Import NotFound page for unmatched routes
import ShowDetail from './pages/ShowDetail'; // Import the ShowDetail component
import { fetchShows } from './services/api'; // Import the function to fetch shows

const App = () => {
  const [shows, setShows] = useState([]); // State to hold the list of shows
  const [error, setError] = useState(null); // State to hold any error message
  const [favourites, setFavourites] = useState([]); // State to hold the favourites

  // Fetch shows when the app mounts
  useEffect(() => {
    const loadShows = async () => {
      try {
        const data = await fetchShows();
        setShows(data);
      } catch (err) {
        setError('Error fetching shows.');
        console.error(err);
      }
    };

    loadShows();
  }, []); // Empty dependency array to run the effect only once

  // Render loading or error messages if needed
  if (error) {
    return <div className="error">{error}</div>;
  }

  if (!shows.length) {
    return <div>Loading shows...</div>;
  }

  return (
    <Router>
      <FavouritesContext.Provider value={{ favourites, setFavourites }}>
        <div className="app">
          <header className="app-header">
            <h1>Podcast App</h1>
          </header>
          <main>
            <Routes>
              {/* Home page with list of shows */}
              <Route path="/" element={<Home shows={shows} />} />

              {/* Show detail page */}
              <Route path="/show/:id" element={<ShowDetail />} />

              {/* Favourites page */}
              <Route path="/favourites" element={<Favourites />} />

              {/* 404 page */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
        </div>
      </FavouritesContext.Provider>
    </Router>
  );
};

export default App;

