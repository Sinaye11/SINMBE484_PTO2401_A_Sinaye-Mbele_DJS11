// ShowDetail page - Displays detailed information about a specific show, including its seasons and episodes

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const ShowDetail = () => {
  const { id } = useParams(); // Get the show ID from the URL
  const [show, setShow] = useState(null);
  const [error, setError] = useState(null);
  const [selectedSeason, setSelectedSeason] = useState(null); // Track selected season

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
  }, [id]); // Re-fetch when the ID changes

  const toggleSeason = (seasonId) => {
    // If the clicked season is the same as the selected one, close it
    if (selectedSeason === seasonId) {
      setSelectedSeason(null); 
    } else {
      setSelectedSeason(seasonId); // Open the clicked season
    }
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
                onClick={() => toggleSeason(season.id)} // Toggle on click
                style={{ cursor: 'pointer', color: 'blue' }}
              >
                Season {index + 1} {/* Display "Season 1", "Season 2", etc. */}
              </h4>

              {/* Conditionally render episodes */}
              {selectedSeason === season.id && (
                <ul>
                  {season.episodes && season.episodes.length > 0 ? (
                    season.episodes.map((episode) => (
                      <li key={episode.id}>
                        <h5>{episode.title}</h5>
                        <p>{episode.description}</p>
                        <audio controls>
                          <source src={episode.audio_url} type="audio/mpeg" />
                          Your browser does not support the audio element.
                        </audio>
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
