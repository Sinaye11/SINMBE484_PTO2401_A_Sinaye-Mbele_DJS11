// src/pages/ShowDetail.js
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useFavourites } from '../context/FavouritesContext';

const ShowDetail = () => {
  const { id: showId } = useParams(); // Get showId from URL parameters
  const { addFavourite, isFavourite, removeFavourite } = useFavourites();
  const [show, setShow] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch show details when the component mounts
  useEffect(() => {
    const fetchShowDetails = async () => {
      try {
        const response = await fetch(`https://podcast-api.netlify.app/id/${showId}`);
        if (!response.ok) throw new Error(`Failed to fetch show with status: ${response.status}`);
        
        const data = await response.json();
        setShow(data); // Set the show data for rendering
      } catch (error) {
        setError(`Error fetching show details: ${error.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchShowDetails();
  }, [showId]);

  if (loading) return <p>Loading show details...</p>;
  if (error) return <p>{error}</p>;
  if (!show) return <p>Show not found.</p>;

  return (
    <div className="show-detail">
      <h2>{show.title}</h2>
      {show.image && <img src={show.image} alt={show.title} />}
      <p>{show.description}</p>

      <div className="seasons">
        <h3>Available Seasons</h3>
        <div className="seasons-list">
          {show.seasons.map((season) => (
            <Link to={`/show/${showId}/season/${season.id}`} key={season.id} className="season-link">
              <button>
                {season.title} ({season.episodes.length} Episodes)
              </button>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ShowDetail;
