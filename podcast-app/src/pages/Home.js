import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; // To handle navigation
import { fetchShows } from '../services/api'; // Assuming you have a function to fetch the shows

const Home = () => {
  const [shows, setShows] = useState([]);

  useEffect(() => {
    // Fetch shows data when the component mounts
    fetchShows()
      .then((data) => {
        // Handle case if data is not an array
        const showsArray = Array.isArray(data) ? data : [data]; // Ensure it's an array
        // Sort shows alphabetically by title
        const sortedShows = showsArray.sort((a, b) => a.title.localeCompare(b.title));

        setShows(sortedShows);  // Set the sorted shows
      })
      .catch((error) => {
        console.error('Error fetching shows:', error);
      });
  }, []);

  // Helper function to format the date
  const formatDate = (date) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(date).toLocaleDateString(undefined, options);
  };

  return (
    <div className="home-page">
      <div className="header">
        <h1>Podcast Shows</h1>
      </div>
      <div className="show-list">
        {shows.length > 0 ? (
          shows.map((show) => (
            <div className="show-card" key={show.id}>
              {/* Make the image clickable and navigate to the show's details page */}
              <Link to={`/show/${show.id}`}>
                <img src={show.image} alt={show.title} className="show-image" />
              </Link>
              <h3 className="show-title">{show.title}</h3>

              {/* Display last modified date */}
              {show.updated && (
                <p className="last-modified">
                  Last Updated: {formatDate(show.updated)}
                </p>
              )}

              {/* Display genre (Assuming it's a single genre for now) */}
              {show.genres && (
                <p className="genre">
                  Genre: {show.genres.join(', ')} {/* Display genres */}
                </p>
              )}

              {/* More Info button */}
              <Link to={`/show/${show.id}`} className="more-info-button">
                More Info
              </Link>
            </div>
          ))
        ) : (
          <p>No shows available.</p>
        )}
      </div>
    </div>
  );
};

export default Home;
