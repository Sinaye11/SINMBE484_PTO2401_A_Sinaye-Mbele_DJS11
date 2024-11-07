// src/pages/ShowDetail.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import AudioPlayer from '../components/AudioPlayer';

const ShowDetail = () => {
  const { id } = useParams();
  const [show, setShow] = useState(null);
  const [error, setError] = useState(null);
  const [selectedSeason, setSelectedSeason] = useState(null);
  const [currentlyPlaying, setCurrentlyPlaying] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  // Handle play/pause for episodes
  const handlePlayPause = (episode) => {
    if (currentlyPlaying && currentlyPlaying.id === episode.id) {
      setIsPlaying(!isPlaying);  // Toggle play/pause state
    } else {
      setCurrentlyPlaying(episode);  // Set the new episode as currently playing
      setIsPlaying(true);  // Start playing the episode
    }
  };

  useEffect(() => {
    const fetchShowDetails = async () => {
      if (!id) {
        setError("Show ID is missing");
        return;
      }

      try {
        const response = await fetch(`https://podcast-api.netlify.app/id/${id}`);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setShow(data);
        setSelectedSeason(data.seasons && data.seasons[0]); // Set default selected season
      } catch (error) {
        setError(`Error fetching show details: ${error.message}`);
      }
    };

    fetchShowDetails();
  }, [id]);

  const handleSeasonChange = (season) => {
    setSelectedSeason(season);
  };

  if (error) {
    return <div>{error}</div>;
  }

  if (!show) {
    return <div>Loading...</div>;
  }

  return (
    <div className="show-detail">
      <h2>{show.title}</h2>
      {show.image && <img src={show.image} alt={show.title} />}
      <p>{show.description}</p>

      {/* Display the seasons */}
      <div className="seasons">
        <h3>Seasons</h3>
        <div className="seasons-list">
          {show.seasons.map((season) => (
            <button key={season.id} onClick={() => handleSeasonChange(season)}>
              {season.title} ({season.episodes.length} Episodes)
            </button>
          ))}
        </div>
      </div>

      {/* Display episodes for selected season */}
      {selectedSeason && (
        <div className="episodes">
          <h4>Episodes of {selectedSeason.title}</h4>
          {selectedSeason.episodes.map((episode, index) => (
            <div key={episode.id} className="episode-card">
              <h5>Episode {index + 1}: {episode.title}</h5> {/* Display episode number */}
              <p>{episode.description}</p>
              {episode.file && (
                <AudioPlayer
                  episode={episode}
                  currentlyPlaying={currentlyPlaying}
                  setCurrentlyPlaying={setCurrentlyPlaying}
                  isPlaying={isPlaying}
                  setIsPlaying={setIsPlaying}
                  handlePlayPause={handlePlayPause}  // Pass handlePlayPause here
                />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ShowDetail;
