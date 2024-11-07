import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; // Import useParams to get the URL parameter
import AudioPlayer from '../components/AudioPlayer';

const ShowDetail = () => {
  const { id } = useParams(); // Extract id from the URL
  const [show, setShow] = useState(null);
  const [error, setError] = useState(null);
  const [selectedSeason, setSelectedSeason] = useState(null);
  const [currentlyPlaying, setCurrentlyPlaying] = useState(null); // Track the current episode
  const [isPlaying, setIsPlaying] = useState(false); // Track play/pause state

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(date);
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

  const handlePlayPause = (episode) => {
    if (currentlyPlaying && currentlyPlaying.id === episode.id) {
      setIsPlaying(!isPlaying);  // Toggle the play state
    } else {
      setCurrentlyPlaying(episode);  // Set the new episode
      setIsPlaying(true);  // Start playing
    }
  };

  if (error) {
    return <div>{error}</div>;
  }

  if (!show) {
    return <div>Loading...</div>;
  }

  const { title, description, image, lastUpdated, seasons } = show;

  return (
    <div className="show-detail">
      <h2>{title}</h2>
      {image && <img src={image} alt={title} />}
      <p>{description}</p>

      {lastUpdated ? (
        <p><strong>Last updated:</strong> {formatDate(lastUpdated)}</p>
      ) : (
        <p><strong>Last updated:</strong> No update date available</p>
      )}

      {/* Display Seasons */}
      <div className="seasons">
        <h3>Seasons</h3>
        <div className="seasons-list">
          {seasons && seasons.length > 0 ? (
            seasons.map((season) => (
              <button
                key={season.id}
                onClick={() => handleSeasonChange(season)}
                className={selectedSeason && selectedSeason.id === season.id ? 'selected' : ''}
              >
                {season.title} ({season.episodes.length} Episodes)
              </button>
            ))
          ) : (
            <p>No seasons available.</p>
          )}
        </div>
      </div>

      {/* Display Selected Season's Episodes */}
      {selectedSeason && (
        <div className="episodes">
          <h4>Episodes of {selectedSeason.title}</h4>
          <div className="episode-list">
            {selectedSeason.episodes.length > 0 ? (
              selectedSeason.episodes.map((episode) => {
                console.log("Episode data:", episode);  // Log the entire episode object
                return (
                  <div key={episode.id} className="episode-card">
                    <h5>{episode.title}</h5>
                    <p>{episode.description}</p>
                    {episode.file && (  // Check for the 'file' property instead of 'audio_url'
                      <AudioPlayer
                        episode={episode}
                        currentlyPlaying={currentlyPlaying === episode ? episode : null}
                        setCurrentlyPlaying={setCurrentlyPlaying}
                        isPlaying={isPlaying}
                        setIsPlaying={setIsPlaying}
                      />
                    )}
                  </div>
                );
              })
            ) : (
              <p>No episodes available for this season.</p>
            )}
          </div>
        </div>  // Closing div for the episodes container
      )}
    </div>
  );
};

export default ShowDetail;

