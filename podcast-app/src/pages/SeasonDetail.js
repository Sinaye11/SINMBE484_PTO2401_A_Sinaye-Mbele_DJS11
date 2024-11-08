// src/pages/SeasonDetail.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import AudioPlayer from '../components/AudioPlayer';
import { useFavourites } from '../context/FavouritesContext';

const SeasonDetail = () => {
  const { showId, seasonId } = useParams(); // Get showId and seasonId from URL parameters
  const { addFavourite, isFavourite, removeFavourite } = useFavourites();
  const [season, setSeason] = useState(null);
  const [showTitle, setShowTitle] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentlyPlaying, setCurrentlyPlaying] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [menuVisible, setMenuVisible] = useState(null);

  // Fetch the show data and filter for the selected season
  useEffect(() => {
    const fetchShowAndSeason = async () => {
      try {
        const response = await fetch(`https://podcast-api.netlify.app/id/${showId}`);
        if (!response.ok) throw new Error(`Failed to fetch show with status: ${response.status}`);
        
        const showData = await response.json();
        setShowTitle(showData.title); // Set the show title for display
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

  const handlePlayPause = (episode) => {
    if (currentlyPlaying && currentlyPlaying.id === episode.id) {
      setIsPlaying(!isPlaying);
    } else {
      setCurrentlyPlaying(episode);
      setIsPlaying(true);
    }
  };

  const toggleMenu = (episodeId) => {
    setMenuVisible((prev) => (prev === episodeId ? null : episodeId));
  };

  if (loading) return <p>Loading season details...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="season-detail">
      <h2>{showTitle} - {season.title}</h2>
      <p>{season.description}</p>

      <div className="episodes">
        <h3>Episodes of {season.title}</h3>
        {season.episodes.map((episode, index) => (
          <div key={episode.id} className="episode-card">
            <h4>Episode {index + 1}: {episode.title}</h4>
            <p>{episode.description}</p>
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
