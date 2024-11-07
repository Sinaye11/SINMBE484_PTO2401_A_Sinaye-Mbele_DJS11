import React, { useEffect, useState } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar'; // Ensure Navbar is imported
import Favourites from './pages/Favourites';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import ShowDetail from './pages/ShowDetail';
import { fetchShows } from './services/api';

const App = () => {
  const [shows, setShows] = useState([]);
  const [error, setError] = useState(null);

  // Fetch shows when the app mounts
  useEffect(() => {
    const loadShows = async () => {
      try {
        const data = await fetchShows();
        setShows(data);
      } catch (error) {
        setError("Failed to fetch shows.");
      }
    };

    loadShows();
  }, []);

  return (
    <Router>
      <div className="App">
        <Navbar />
        {error && <div className="error">{error}</div>}
        <Routes>
          <Route path="/" element={<Home shows={shows} />} />
          <Route path="/show/:id" element={<ShowDetail />} />
          <Route path="/favourites" element={<Favourites />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
