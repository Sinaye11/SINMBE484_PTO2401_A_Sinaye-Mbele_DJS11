// Home page that displays a list of available shows (podcasts)

// Home page that displays a list of available shows (podcasts)

import React, { useEffect, useState } from 'react';
import './Home.css'; // Optional: Import specific styles for the Home component

const Home = () => {
  const [shows, setShows] = useState([]); // State to store shows data
  const [error, setError] = useState(null); // State to store error messages

  // Fetch shows from the API
  useEffect(() => {
    const fetchShows = async () => {
      try {
        const response = await fetch('https://podcast-api.netlify.app'); // Fetch shows from the preview endpoint
        const data = await response.json();
        setShows(data); // Set the fetched shows data
      } catch (err) {
        setError('Error fetching shows'); // Set error if fetch fails
        console.error(err);
      }
    };

    fetchShows();
  }, []); // Empty dependency array to fetch data only once when the component mounts

  if (error) {
    return <div className="error">{error}</div>; // Show error message if there's an issue with the fetch
  }

  return (
    <div className="home">
      <h2>Podcast Shows</h2>
      {/* Check if there are any shows to display */}
      {shows.length === 0 ? (
        <p>No shows available</p>
      ) : (
        <div className="show-list">
          {/* Map through the shows and render them */}
          {shows.map((show) => (
            <div key={show.id} className="show-card">
              {/* Display the image if it exists */}
              {show.image && (
                <img
                  src={show.image} // Use the correct property for the image URL (e.g., show.image or show.thumbnail)
                  alt={show.title}
                  className="show-image"
                />
              )}
              <h3>{show.title}</h3>
              {/* Optional: Display show details like a description */}
              <p>{show.description}</p>
              {/* Add a link to view more details (optional) */}
              <a href={`/show/${show.id}`}>View Show</a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
