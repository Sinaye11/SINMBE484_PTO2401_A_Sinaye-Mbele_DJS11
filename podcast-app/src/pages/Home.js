import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; // To handle navigation
import { fetchShows } from '../services/api'; // Assuming you have a function to fetch the shows

const Home = () => {
  const [shows, setShows] = useState([]);

  useEffect(() => {
    // Fetch shows data when the component mounts
    fetchShows()
      .then((data) => {
        setShows(data);  // Assuming `data` is an array of shows
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
        {/* Logo and text aligned horizontally */}
        {/* <img src={logo} alt="Podcast Logo" className="logo" /> */}
        <h1>Podcast Shows</h1>
      </div>
      <div className="show-list">
        {shows.map((show) => (
          <div className="show-card" key={show.id}>
            {/* Make the image clickable and navigate to the show's details page */}
            <Link to={`/show/${show.id}`}>
              <img src={show.image} alt={show.title} className="show-image" />
            </Link>
            <h3 className="show-title">{show.title}</h3>
            
            {/* Display last modified date */}
            {show.lastModified && (
              <p className="last-modified">
                Last Modified: {formatDate(show.lastModified)}
              </p>
            )}

            {/* Display genre */}
            {show.genre && (
              <p className="genre">
                Genre: {show.genre}
              </p>
            )}

            {/* More Info button */}
            <Link to={`/show/${show.id}`} className="more-info-button">
              More Info
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
