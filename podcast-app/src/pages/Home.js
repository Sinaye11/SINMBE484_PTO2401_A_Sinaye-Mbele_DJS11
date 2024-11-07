import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; // To handle navigation
import GenreFilter from '../components/GenreFilter'; // Import the GenreFilter component
import { fetchShows } from '../services/api'; // Assuming you have a function to fetch the shows

const Home = () => {
  const [shows, setShows] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState(''); // Track the selected genre

  useEffect(() => {
    // Fetch shows data when the component mounts
    fetchShows()
      .then((data) => {
        // Sort shows alphabetically by title before setting state
        const sortedShows = data.sort((a, b) => a.title.localeCompare(b.title));
        setShows(sortedShows);  // Assuming `data` is an array of shows
      })
      .catch((error) => {
        console.error('Error fetching shows:', error);
      });
  }, []);

  // Filter the shows based on the selected genre
  const filteredShows = selectedGenre
    ? shows.filter((show) => show.genres && show.genres.includes(parseInt(selectedGenre)))
    : shows;

  // Helper function to format the date
  const formatDate = (date) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(date).toLocaleDateString(undefined, options);
  };

  // Genre mapping object
  const genreMap = {
    1: 'Personal Growth',
    2: 'Investigative Journalism',
    3: 'History',
    4: 'Comedy',
    5: 'Entertainment',
    6: 'Business',
    7: 'Fiction',
    8: 'News',
    9: 'Kids and Family'
  };

  // Handle the genre change from GenreFilter
  const handleGenreFilterChange = (genre) => {
    setSelectedGenre(genre);
  };

  return (
    <div className="home-page">
      <div className="header">
        {/* Logo and text aligned horizontally */}
        <h1>Podcast Shows</h1>
      </div>

      {/* Add the GenreFilter component */}
      <GenreFilter
        genres={Object.keys(genreMap)} // Pass genre IDs to GenreFilter
        onFilterChange={handleGenreFilterChange}
        currentGenre={selectedGenre}
      />

      <div className="show-list">
        {filteredShows.map((show) => (
          <div className="show-card" key={show.id}>
            {/* Make the image clickable and navigate to the show's details page */}
            <Link to={`/show/${show.id}`}>
              <img src={show.image} alt={show.title} className="show-image" />
            </Link>
            <h3 className="show-title">{show.title}</h3>

            {/* Display last modified date if available */}
            {show.updated && (
              <p className="last-modified">
                Last Updated: {formatDate(show.updated)}
              </p>
            )}

            {/* Display genre using the genreMap */}
            {show.genres && show.genres.length > 0 && (
              <p className="genre">
                Genre: {show.genres.map((genreId) => genreMap[genreId] || 'Unknown').join(', ')}
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
