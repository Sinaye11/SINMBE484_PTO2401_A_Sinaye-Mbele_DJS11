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

/**
 * App Component
 * This is the main component of the podcast application, managing global state, routing, and UI layout.
 */
const App = () => {
  const [shows, setShows] = useState([]); // State to store the list of shows fetched from the API
  const [error, setError] = useState(null); // State to capture any errors that occur during data fetching
  const [currentEpisode, setCurrentEpisode] = useState(null); // State for the currently selected episode to play
  const [isPlaying, setIsPlaying] = useState(false); // State to track whether the audio player is currently playing

  // useEffect to fetch shows when the component mounts
  useEffect(() => {
    const loadShows = async () => {
      try {
        const data = await fetchShows(); // Fetch show data from the API
        const sortedData = data.sort((a, b) => a.title.localeCompare(b.title)); // Sort shows alphabetically by title
        setShows(sortedData); // Update the state with the sorted shows
      } catch (error) {
        setError('Failed to fetch shows.'); // Set error message if the fetch fails
      }
    };
    loadShows(); // Invoke the async function to load shows
  }, []); // Empty dependency array ensures this runs only once when the component mounts

  // useEffect to handle browser tab close or refresh prompts
  useEffect(() => {
    const handleBeforeUnload = (event) => {
      if (isPlaying) {
        event.preventDefault(); // Prevent default behavior
        event.returnValue = ''; // Show confirmation dialog in most browsers
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload); // Attach event listener for beforeunload
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload); // Cleanup: remove event listener on unmount
    };
  }, [isPlaying]); // Re-run this effect if the isPlaying state changes

  return (
    <FavouritesProvider>
      <Router>
        <div className="app-layout">
          <Sidebar /> {/* Sidebar for navigating between different pages of the app */}

          <AudioPlayer
            episode={currentEpisode} // Pass the current episode to the AudioPlayer component
            isPlaying={isPlaying} // Pass the playback status to the AudioPlayer
            setIsPlaying={setIsPlaying} // Function to update playback status from the AudioPlayer
          />

          <main className="content">
            {error && <div className="app-error">{error}</div>} {/* Display error message if fetching fails */}
            <Routes>
              <Route path="/" element={<Home shows={shows} />} /> {/* Home page displaying the list of shows */}
              <Route
                path="/show/:id"
                element={
                  <ShowDetailWrapper
                    setCurrentEpisode={setCurrentEpisode} // Function to set the currently selected episode
                    setIsPlaying={setIsPlaying} // Function to control the playback status
                  />
                }
              />
              <Route path="/favourites" element={<Favourites />} /> {/* Page for user's favourite shows */}
              <Route path="*" element={<NotFound />} /> {/* 404 page for unmatched routes */}
            </Routes>
          </main>
        </div>
      </Router>
    </FavouritesProvider>
  );
};

export default App;
