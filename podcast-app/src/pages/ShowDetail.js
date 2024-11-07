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

  // Genre ID to Title Mapping
  const genreMapping = {
    1: 'Personal Growth',
    2: 'Investigative Journalism',
    3: 'History',
    4: 'Comedy',
    5: 'Entertainment',
    6: 'Business',
    7: 'Fiction',
    8: 'News',
    9: 'Kids and Family',
  };

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

  // Debug: Check the structure of the show data
  console.log("Show data:", show);

  return (
    <div className="show-detail">
      <h2>{show.title}</h2>
      {show.image && <img src={show.image} alt={show.title} />}
      <p>{show.description}</p>

      {/* Display Genre */}
      {show.genre ? (
        <div className="show-genre">
          <strong>Genre: </strong>
          <p>{genreMapping[show.genre] || 'Unknown Genre'}</p>
        </div>
      ) : (
        <div className="show-genre">
          <strong>Genre: </strong>
          <p>No genre available</p>
        </div>
      )}

      {/* Display seasons */}
      {show.seasons && show.seasons.length > 0 ? (
        <div>
          <h3>Seasons</h3>
          {show.seasons.map((season, index) => (
            <div key={season.id} className="season">
              {/* Display season title */}
              <h4
                onClick={() => toggleSeason(season.id)}
                style={{ cursor: 'pointer', color: 'blue' }}
              >
                Season {index + 1}
              </h4>

              {/* Conditionally render season description */}
              {selectedSeason === season.id && season.description && (
                <div className="season-description">
                  <p>{season.description}</p>
                </div>
              )}

              {/* Conditionally render season image */}
              {selectedSeason === season.id && season.image && (
                <div className="season-image">
                  <img src={season.image} alt={`Season ${index + 1}`} />
                </div>
              )}

              {/* Conditionally render episodes for the selected season */}
              {selectedSeason === season.id && (
                <div className="episodes">
                  {season.episodes && season.episodes.length > 0 ? (
                    <ul>
                      {season.episodes.map((episode, episodeIndex) => (
                        <li key={episode.id} className="episode">
                          <h5>
                            Episode {episodeIndex + 1}: {episode.title}
                          </h5>
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
                      ))}
                    </ul>
                  ) : (
                    <p>No episodes available for this season.</p>
                  )}
                </div>
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
