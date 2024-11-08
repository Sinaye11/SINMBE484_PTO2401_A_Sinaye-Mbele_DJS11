// src/pages/SeasonDetail.js

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import AudioPlayer from '../components/AudioPlayer';
import { useFavourites } from '../context/FavouritesContext';

// SeasonDetail component displays details of a specific season and its episodes
const SeasonDetail = () => {
  const { showId, seasonId } = useParams(); // Extract showId and seasonId from URL parameters
  const { addFavourite, isFavourite, removeFavourite } = useFavourites();
  
  const [season, setSeason] = useState(null); // State to store season data
  const [showTitle, setShowTitle] = useState(''); // State to store the show title
  const [loading, setLoading] = useState(true); // State to manage loading indicator
  const [error, setError] = useState(null); // State to store any error message
  const [currentlyPlaying, setCurrentlyPlaying] = useState(null); // Stores currently playing episode
  const [isPlaying, setIsPlaying] = useState(false); // Manages play/pause state
  const [menuVisible, setMenuVisible] = useState(null); // Manages visibility of dropdown menu

  // Fetches show data and filters for the selected season on component mount
  useEffect(() => {
    const fetchShowAndSeason = async () => {
      try {
        // Fetch show details from API using showId
        const response = await fetch(`https://podcast-api.netlify.app/id/${showId}`);
        if (!response.ok) throw new Error(`Failed to fetch show with status: ${response.status}`);
        
        // Parse response data into JSON format
        const showData = await response.json();
        setShowTitle(showData.title); // Set the show title

        // Find the specific season from the show's seasons
        const selectedSeason = showData.seasons.find((s) => s.id === parseInt(seasonId));
        if (selectedSeason) {
          setSeason(selectedSeason); // Update season state with found season data
        } else {
          setError("Season not found."); // Set error if season is not found
        }
      } catch (error) {
        setError(`Error fetching season data: ${error.message}`); // Set error message for fetch failure
      } finally {
        setLoading(false); // Stop loading once data is fetched or an error occurs
      }
    };

    fetchShowAndSeason();
  }, [showId, seasonId]);

  // Toggles play/pause state for a selected episode
  const handlePlayPause = (episode) => {
    if (currentlyPlaying && currentlyPlaying.id === episode.id) {
      setIsPlaying(!isPlaying); // Toggle play/pause if the same episode is selected
    } else {
      setCurrentlyPlaying(episode); // Set new episode as currently playing
      setIsPlaying(true); // Start playing the new episode
    }
  };

  // Toggles visibility of the dropdown menu for an episode
  const toggleMenu = (episodeId) => {
    setMenuVisible((prev) => (prev === episodeId ? null : episodeId));
  };

  // Conditional rendering based on loading and error states
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
