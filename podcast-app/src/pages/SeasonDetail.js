// src/pages/SeasonDetail.js

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import AudioPlayer from '../components/AudioPlayer';
import { useFavourites } from '../context/FavouritesContext';

/**
 * SeasonDetail Component
 * 
 * Displays details of a specific season and its episodes.
 */
const SeasonDetail = () => {
  const { showId, seasonId } = useParams(); // Extract showId and seasonId from URL parameters
  const { addFavourite, isFavourite, removeFavourite } = useFavourites(); // Access context for managing favourites
  
  // State hooks for managing various aspects of the component
  const [season, setSeason] = useState(null); // Stores data about the current season
  const [showTitle, setShowTitle] = useState(''); // Stores the title of the current show
  const [loading, setLoading] = useState(true); // Loading indicator
  const [error, setError] = useState(null); // Stores error messages
  const [currentlyPlaying, setCurrentlyPlaying] = useState(null); // Tracks the currently playing episode
  const [isPlaying, setIsPlaying] = useState(false); // Boolean to indicate whether an episode is playing
  const [menuVisible, setMenuVisible] = useState(null); // Tracks the visibility of the dropdown menu

  // Fetches show data and filters for the selected season
  useEffect(() => {
    const fetchShowAndSeason = async () => {
      try {
        const response = await fetch(`https://podcast-api.netlify.app/id/${showId}`);
        if (!response.ok) throw new Error(`Failed to fetch show with status: ${response.status}`);
        
        const showData = await response.json();
        setShowTitle(showData.title);

        const selectedSeason = showData.seasons.find((s) => s.id === parseInt(seasonId));
        if (selectedSeason) {
          setSeason(selectedSeason);
        } else {
          setError("Season not found.");
        }
      } catch (error) {
        setError(`Error fetching season data: ${error.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchShowAndSeason();
  }, [showId, seasonId]);

  // Handles play/pause state for an episode
  const handlePlayPause = (episode) => {
    if (currentlyPlaying && currentlyPlaying.id === episode.id) {
      setIsPlaying(!isPlaying);
    } else {
      setCurrentlyPlaying(episode);
      setIsPlaying(true);
    }
  };

  // Toggles the visibility of the dropdown menu for a specific episode
  const toggleMenu = (episodeId) => {
    setMenuVisible((prev) => (prev === episodeId ? null : episodeId));
  };

  if (loading) return <p>Loading season details...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="season-detail">
      <h2>{showTitle} - {season.title}</h2>
      <p>{season.description}</p>

      {/* Episodes list for the season */}
      <div className="episodes">
        <h3>Episodes of {season.title}</h3>
        {season.episodes.map((episode, index) => (
          <div key={episode.id} className="episode-card">
            <h4>Episode {index + 1}: {episode.title}</h4>
            <p>{episode.description}</p>
            
            {/* Audio player for the episode if a file is available */}
            {episode.file && (
              <AudioPlayer
                episode={episode}
                currentlyPlaying={currentlyPlaying}
                setCurrentlyPlaying={setCurrentlyPlaying}
                isPlaying={isPlaying}
                setIsPlaying={setIsPlaying}
                handlePlayPause={handlePlayPause}
              />
            )}
            
            {/* Dropdown menu button and visibility control */}
            <button className="three-dot-button" onClick={() => toggleMenu(episode.id)}>⋮</button>
            {menuVisible === episode.id && (
              <div className="dropdown-menu">
                {isFavourite(episode.id) ? (
                  <button onClick={() => removeFavourite(episode.id)}>Remove from Favourites</button>
                ) : (
                  <button onClick={() => addFavourite(episode)}>Add to Favourites</button>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SeasonDetail;

