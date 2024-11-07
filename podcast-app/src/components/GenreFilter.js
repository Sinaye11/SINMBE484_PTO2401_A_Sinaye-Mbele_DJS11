import React from 'react';

const GenreFilter = ({ genres, onFilterChange }) => {
  return (
    <div className="genre-filter">
      <label>Filter by Genre:</label>
      <select onChange={(e) => onFilterChange(e.target.value)}>
        <option value="">All</option>
        {genres.map((genre) => (
          <option key={genre} value={genre}>
            {genre}
          </option>
        ))}
      </select>
    </div>
  );
};

export default GenreFilter;
