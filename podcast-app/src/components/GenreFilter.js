import React, { useEffect, useState } from 'react';

// Genre ID to Title Mapping
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

const GenreFilter = ({ genres, onFilterChange, currentGenre }) => {
  const [selectedGenre, setSelectedGenre] = useState(currentGenre || '');

  useEffect(() => {
    setSelectedGenre(currentGenre); // Sync with current genre from parent
  }, [currentGenre]);

  const handleGenreChange = (event) => {
    const selected = event.target.value;
    setSelectedGenre(selected); // Update local state
    onFilterChange(selected); // Pass selected genre to parent
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
