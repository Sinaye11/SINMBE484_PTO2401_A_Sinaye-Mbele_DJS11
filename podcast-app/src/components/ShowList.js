//Displays list of shows

import React from 'react';
import GenreFilter from './GenreFilter'; // Importing the GenreFilter component to filter shows by genre
import LoadingSpinner from './LoadingSpinner'; // Importing the LoadingSpinner component to show a loading state
import ShowCard from './ShowCard'; // Importing the ShowCard component to display individual show details

// ShowList component to display a list of shows
const ShowList = ({ shows, genres, onFilterChange, isLoading }) => {
  return (
    <div className="show-list">
      {/* Genre filter component to filter shows by genre */}
      <GenreFilter genres={genres} onFilterChange={onFilterChange} />

      {/* If loading, show loading spinner */}
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <>
          {/* If no shows are available, display a message */}
          {shows.length === 0 ? (
            <p>No shows available at the moment.</p>
          ) : (
            // Mapping over the shows array to display each show in a ShowCard component
            shows.map((show) => (
              <ShowCard key={show.id} show={show} />
            ))
          )}
        </>
      )}
    </div>
  );
};

export default ShowList;
