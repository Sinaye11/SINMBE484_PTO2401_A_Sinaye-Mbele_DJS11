import React, { useEffect, useState } from 'react';
import { Link, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import logo from './assets/logo.png';
import { FavouritesContext } from './context/FavouritesContext';
import Favourites from './pages/Favourites';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import ShowDetail from './pages/ShowDetail';
import { fetchShows } from './services/api';

const App = () => {
  const [shows, setShows] = useState([]); 
  const [error, setError] = useState(null); 
  const [favourites, setFavourites] = useState([]); 

  // Fetch shows when the app mounts
  useEffect(() => {
    const loadShows = async () => {
      try {
        const data = await fetchShows(); // Fetch shows from the API
        console.log('Fetched data:', data); // Log the raw response to check the structure

        if (!data) {
          throw new Error('No shows data found');
        }

        // Handle if the response is a single show instead of an array.
        const showsArray = Array.isArray(data) ? data : [data]; // Ensure data is treated as an array
        
        // Now sort the shows alphabetically based on the title property
        const sortedShows = showsArray.sort((a, b) => a.title.localeCompare(b.title)); 

        setShows(sortedShows); // Set the sorted shows into the state
      } catch (err) {
        setError('Error fetching shows.');
        console.error('Error fetching shows:', err); // Log detailed error for debugging
      }
    };

    loadShows();
  }, []);

  // Render loading or error messages if needed
  if (error) {
    return (
      <div className="error">
        <h2>{error}</h2> {/* Display the error message */}
      </div>
    );
  }

  if (!shows.length) {
    return (
      <div className="loading">
        <h2>Loading shows...</h2>
      </div>
    );
  }

  return (
    <Router>
      <FavouritesContext.Provider value={{ favourites, setFavourites }}>
        <div className="app">
          {/* Navbar */}
          <header className="navbar">
            <div className="logo-container">
              <img src={logo} alt="App Logo" />
              <h1>Podcast App</h1>
            </div>
            <div className="nav-links">
              <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/favourites">Favourites</Link></li>
              </ul>
            </div>
          </header>

          {/* Main Content */}
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Home shows={shows} />} />
              <Route path="/show/:id" element={<ShowDetail />} />
              <Route path="/favourites" element={<Favourites />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
        </div>
      </FavouritesContext.Provider>
    </Router>
  );
};

export default App;
