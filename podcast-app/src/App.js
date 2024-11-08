// src/App.js
import React, { useEffect, useState } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import AudioPlayer from './components/AudioPlayer';
import ShowDetailWrapper from './components/ShowDetailWrapper';
import Sidebar from './components/Sidebar';
import { FavouritesProvider } from './context/FavouritesContext';
import Favourites from './pages/Favourites';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import { fetchShows } from './services/api';

const App = () => {
  const [shows, setShows] = useState([]);
  const [error, setError] = useState(null);
  const [currentEpisode, setCurrentEpisode] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const loadShows = async () => {
      try {
        const data = await fetchShows();
        const sortedData = data.sort((a, b) => a.title.localeCompare(b.title));
        setShows(sortedData);
      } catch (error) {
        setError('Failed to fetch shows.');
      }
    };
    loadShows();
  }, []);

  // Add beforeunload event listener to prompt before navigating away
  useEffect(() => {
    const handleBeforeUnload = (event) => {
      if (isPlaying) {
        event.preventDefault();
        event.returnValue = ''; // Standard way to trigger a browser prompt
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [isPlaying]);

  return (
    <FavouritesProvider>
      <Router>
        <div className="app-layout">
          <Sidebar />

          <AudioPlayer
            episode={currentEpisode}
            isPlaying={isPlaying}
            setIsPlaying={setIsPlaying}
          />

          <main className="content">
            {error && <div className="app-error">{error}</div>}
            <Routes>
              <Route path="/" element={<Home shows={shows} />} />
              <Route
                path="/show/:id"
                element={
                  <ShowDetailWrapper
                    setCurrentEpisode={setCurrentEpisode}
                    setIsPlaying={setIsPlaying}
                  />
                }
              />
              <Route path="/favourites" element={<Favourites />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
        </div>
      </Router>
    </FavouritesProvider>
  );
};

export default App;
