// src/pages/ShowDetail.js

import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useFavourites } from '../context/FavouritesContext';

// ShowDetail component to display details of a specific show based on showId from the URL
const ShowDetail = () => {
  const { id: showId } = useParams(); // Extracts showId from the URL to identify the current show
  const { addFavourite, isFavourite, removeFavourite } = useFavourites(); // Accesses functions to manage favourites
  const [show, setShow] = useState(null); // Holds data for the specific show being displayed
  const [error, setError] = useState(null); // Holds any error message encountered during fetch
  const [loading, setLoading] = useState(true); // Controls loading state for conditional rendering

  // Fetch show details from the API when the component is mounted
  useEffect(() => {
    const fetchShowDetails = async () => {
      try {
        // Send a request to fetch show data based on showId
        const response = await fetch(`https://podcast-api.netlify.app/id/${showId}`);
        
        // If response is not successful, throw an error with the status
        if (!response.ok) throw new Error(`Failed to fetch show with status: ${response.status}`);
        
        // Parse response data into JSON format
        const data = await response.json();
        setShow(data); // Update the state with the fetched show data
      } catch (error) {
        setError(`Error fetching show details: ${error.message}`); // Set error message if fetch fails
      } finally {
        setLoading(false); // Stop loading whether the fetch is successful or fails
      }
    };

    fetchShowDetails(); // Invoke fetchShowDetails function
  }, [showId]); // Dependency on showId ensures it refetches if showId changes

  // Conditional rendering based on loading, error, or data states
  if (loading) return <p>Loading show details...</p>; // Display loading message
  if (error) return <p>{error}</p>; // Display error message if there's an error
  if (!show) return <p>Show not found.</p>; // Show message if no data is found for showId

  return (
    <div className="show-detail">
      <h2>{show.title}</h2> {/* Display the show's title */}
      {show.image && <img src={show.image} alt={show.title} />} {/* Show image if available */}
      <p>{show.description}</p> {/* Display show description */}

      {/* Section to display list of available seasons */}
      <div className="seasons">
        <h3>Available Seasons</h3>
        <div className="seasons-list">
          {show.seasons.map((season) => (
            <Link to={`/show/${showId}/season/${season.id}`} key={season.id} className="season-link">
              <button>
                {season.title} ({season.episodes.length} Episodes) {/* Button showing season title and episode count */}
              </button>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ShowDetail;

