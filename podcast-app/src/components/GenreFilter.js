// src/components/GenreFilter.js
import React, { useEffect, useState } from 'react';

// Map of genre IDs to genre titles for display
const genreMapping = {
  1: 'Personal Growth',
  2: 'Investigative Journalism',
  3: 'History',
  4: 'Comedy',
  5: 'Entertainment',
  6: 'Business',
  7: 'Fiction',
  8: 'News',
  9: 'Kids and Family',
};

/**
 * GenreFilter Component
 *
 * Allows users to filter shows by genre.
 *
 * Props:
 * - genres: Array of genre IDs to display in the dropdown.
 * - onFilterChange: Function to call when the selected genre changes.
 * - currentGenre: Currently selected genre ID.
 */
const GenreFilter = ({ genres, onFilterChange, currentGenre }) => {
  const [selectedGenre, setSelectedGenre] = useState(currentGenre || '');

  // Update selected genre when `currentGenre` prop changes
  useEffect(() => {
    setSelectedGenre(currentGenre);
  }, [currentGenre]);

  // Handle dropdown change and notify parent
  const handleGenreChange = (event) => {
    const selected = event.target.value;
    setSelectedGenre(selected); // Update local state with selected genre
    onFilterChange(selected); // Notify parent of selected genre change
  };

  return (
    <div className="genre-filter">
      <label htmlFor="genre-select">Filter by Genre:</label>
      
      <select 
        id="genre-select" 
        value={selectedGenre} 
        onChange={handleGenreChange}
        aria-label="Select a genre to filter shows"
      >
        <option value="">All</option>
        
        {genres && genres.length > 0 ? (
          genres.map((genreId) => (
            <option key={genreId} value={genreId}>
              {genreMapping[genreId] || 'Unknown Genre'}
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
