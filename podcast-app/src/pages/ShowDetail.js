// ShowDetail page - Displays detailed information about a specific show, including its seasons and episodes

// src/pages/ShowDetail.js

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const ShowDetail = () => {
  const { id } = useParams(); // Get the show ID from the URL
  const [show, setShow] = useState(null);

  useEffect(() => {
    const fetchShowDetails = async () => {
      try {
        const response = await fetch(`https://podcast-api.netlify.app`);
        const data = await response.json();
        setShow(data); // Set show data
      } catch (error) {
        console.error('Error fetching show details:', error);
      }
    };

    fetchShowDetails();
  }, [id]); // Re-fetch when the ID changes

  if (!show) {
    return <div>Loading show details...</div>;
  }

  return (
    <div>
      <h2>{show.title}</h2>
      <img src={show.imageUrl} alt={show.title} />
      <p>{show.description}</p>

      {/* Display episodes if available */}
      {show.episodes && show.episodes.length > 0 ? (
        <div>
          <h3>Episodes</h3>
          <ul>
            {show.episodes.map((episode) => (
              <li key={episode.id}>
                <h4>{episode.title}</h4>
                <p>{episode.description}</p>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p>No episodes available for this show.</p>
      )}
    </div>
  );
};

export default ShowDetail;
