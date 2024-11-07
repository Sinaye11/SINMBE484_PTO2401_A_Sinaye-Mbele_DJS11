import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import AudioPlayer from '../components/AudioPlayer'; // Import the AudioPlayer component

const ShowDetail = () => {
  const { id } = useParams();
  const [show, setShow] = useState(null);
  const [error, setError] = useState(null);
  const [selectedSeason, setSelectedSeason] = useState(null);
  const [currentlyPlaying, setCurrentlyPlaying] = useState(null);  // Track currently playing episode
  const [isPlaying, setIsPlaying] = useState(false);  // Track play/pause state

  useEffect(() => {
    const fetchShowDetails = async () => {
      try {
        const response = await fetch(`https://podcast-api.netlify.app/id/${id}`);
        if (!response.ok) {
          throw new Error('Show not found');
        }
        const data = await response.json();
        setShow(data);
      } catch (error) {
        setError('Error fetching show details');
        console.error('Error fetching show details:', error);
      }
    };

    fetchShowDetails();
  }, [id]);

  const toggleSeason = (seasonId) => {
    setSelectedSeason(selectedSeason === seasonId ? null : seasonId);
  };

  if (error) {
    return <div>{error}</div>;
  }

  if (!show) {
    return <div>Loading show details...</div>;
  }

  return (
    <div className="show-detail">
      <h2>{show.title}</h2>
      {show.image && <img src={show.image} alt={show.title} />}
      <p>{show.description}</p>

      {/* Display seasons */}
      {show.seasons && show.seasons.length > 0 ? (
        <div>
          <h3>Seasons</h3>
          {show.seasons.map((season, index) => (
            <div key={season.id} className="season">
              <h4
                onClick={() => toggleSeason(season.id)}
                style={{ cursor: 'pointer', color: 'blue' }}
              >
                Season {index + 1}
              </h4>

              {/* Conditionally render episodes */}
              {selectedSeason === season.id && (
                <ul>
                  {season.episodes && season.episodes.length > 0 ? (
                    season.episodes.map((episode) => (
                      <li key={episode.id}>
                        <h5>{episode.title}</h5>
                        <p>{episode.description}</p>
                        
                        {/* Render AudioPlayer for each episode */}
                        {episode.audio_url ? (
                          <AudioPlayer 
                            episode={episode}
                            currentlyPlaying={currentlyPlaying}
                            setCurrentlyPlaying={setCurrentlyPlaying}
                            isPlaying={isPlaying}
                            setIsPlaying={setIsPlaying}
                          />
                        ) : (
                          <p>Audio unavailable</p>
                        )}
                      </li>
                    ))
                  ) : (
                    <p>No episodes available for this season.</p>
                  )}
                </ul>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p>No seasons available for this show.</p>
      )}
    </div>
  );
};

export default ShowDetail;
