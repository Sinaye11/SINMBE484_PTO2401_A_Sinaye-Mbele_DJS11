// src/pages/Home.js

import Fuse from 'fuse.js'; // Library for performing fuzzy searches
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Slider from 'react-slick'; // Carousel component for featured shows
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
import GenreFilter from '../components/GenreFilter';
import '../pages/Home.css';
import { fetchShows } from '../services/api';

/**
 * Home Component
 *
 * Displays a list of podcast shows with features including:
 * - Fuzzy search for titles
 * - Genre filtering
 * - Alphabetical sorting
 * - Carousel for featured shows
 */
const Home = () => {
  const [shows, setShows] = useState([]); // State for all fetched shows
  const [selectedGenre, setSelectedGenre] = useState(''); // State for selected genre filter
  const [query, setQuery] = useState(''); // State for search input query

  // Fetch and sort shows alphabetically when the component mounts
  useEffect(() => {
    fetchShows()
      .then((data) => {
        // Sort shows alphabetically by title
        const sortedShows = data.sort((a, b) => a.title.localeCompare(b.title));
        setShows(sortedShows);
      })
      .catch((error) => {
        console.error('Error fetching shows:', error); // Log any fetch errors
      });
  }, []);

  // Initialize Fuse for fuzzy search, configured to search within titles
  const fuse = new Fuse(shows, { keys: ['title'], threshold: 0.3 });
  const filteredShows = query
    ? fuse.search(query).map(result => result.item) // Filter shows by search query
    : selectedGenre
    ? shows.filter((show) => show.genres && show.genres.includes(parseInt(selectedGenre))) // Filter shows by selected genre
    : shows; // Display all shows if no filter or query is applied

  // Update selected genre when the genre filter is changed
  const handleGenreFilterChange = (genre) => {
    setSelectedGenre(genre);
  };

  // Carousel settings for displaying featured shows
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2 } }, // Display 2 slides on medium screens
      { breakpoint: 768, settings: { slidesToShow: 1 } } // Display 1 slide on small screens
    ]
  };

  // Format date strings to a human-readable format for display
  const formatDate = (date) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(date).toLocaleDateString(undefined, options);
  };

  // Map of genre IDs to genre names for displaying in the genre filter and show cards
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

  return (
    <div className="home-page">
      <div className="header">
        <h1>Podcast Shows</h1>
      </div>

      {/* Input field for searching shows by title */}
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for a show..."
        className="search-input"
      />

      {/* Dropdown to filter shows by genre */}
      <GenreFilter
        genres={Object.keys(genreMap)}
        onFilterChange={handleGenreFilterChange}
        currentGenre={selectedGenre}
      />

      <h2>Featured Shows</h2>
      
      {/* Carousel displaying a limited set of featured shows */}
      <Slider {...settings}>
        {filteredShows.slice(0, 6).map((show) => (
          <Link to={`/show/${show.id}`} key={show.id} className="carousel-item">
            <img src={show.image} alt={show.title} className="carousel-image" />
            <h3>{show.title}</h3>
          </Link>
        ))}
      </Slider>

      {/* List of all shows, filtered and sorted as per user selection */}
      <div className="show-list">
        {filteredShows.map((show) => (
          <div className="show-card" key={show.id}>
            <Link to={`/show/${show.id}`}>
              <img src={show.image} alt={show.title} className="show-image" />
            </Link>
            <h3 className="show-title">{show.title}</h3>
            {show.updated && (
              <p className="last-modified">Last Updated: {formatDate(show.updated)}</p>
            )}
            {show.genres && show.genres.length > 0 && (
              <p className="genre">
                Genre: {show.genres.map((genreId) => genreMap[genreId] || 'Unknown').join(', ')}
              </p>
            )}
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
