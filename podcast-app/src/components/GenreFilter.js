//Filter shows by genre

import React, { useEffect, useState } from 'react';

// GenreFilter component to filter shows by genre
const GenreFilter = ({ genres, onFilterChange, currentGenre }) => {
  const [selectedGenre, setSelectedGenre] = useState(currentGenre || '');

  useEffect(() => {
    // Update the selected genre if the currentGenre prop changes
    setSelectedGenre(currentGenre);
  }, [currentGenre]);

  const handleGenreChange = (event) => {
    const selected = event.target.value;
    setSelectedGenre(selected); // Update local state
    onFilterChange(selected); // Pass the selected genre to the parent component
  };

  return (
    <div className="genre-filter">
      {/* Label for accessibility */}
      <label htmlFor="genre-select">Filter by Genre:</label>
      
      {/* Genre selection dropdown */}
      <select 
        id="genre-select" 
        value={selectedGenre} 
        onChange={handleGenreChange}
        aria-label="Select a genre to filter shows"
      >
        <option value="">All</option>
        
        {/* Mapping through genres to create option elements */}
        {genres && genres.length > 0 ? (
          genres.map((genre) => (
            <option key={genre} value={genre}>
              {genre}
            </option>
          ))
        ) : (
          <option disabled>No genres available</option>
        )}
      </select>
    </div>
  );
};

export default GenreFilter;

