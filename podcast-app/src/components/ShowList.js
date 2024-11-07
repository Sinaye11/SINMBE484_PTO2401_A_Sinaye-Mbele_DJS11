import React from 'react';
import GenreFilter from './GenreFilter'; // Genre filter for filtering shows by genre
import LoadingSpinner from './LoadingSpinner'; // Loading spinner for the loading state
import ShowCard from './ShowCard'; // ShowCard for displaying individual show details

// ShowList component to display a list of shows
const ShowList = ({ shows, genres, onFilterChange, isLoading }) => {
  return (
    <div className="landing-page">
      {/* Page title with logo */}
      <div className="page-header">
        <img src="path/to/logo.png" alt="Logo" className="logo" />
        <h1 className="page-title">Podcast Shows</h1>
      </div>

      {/* Genre filter */}
      <GenreFilter genres={genres} onFilterChange={onFilterChange} />

      {/* Loading spinner or show cards */}
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <>
          {/* If no shows are available */}
          {shows.length === 0 ? (
            <p>No shows available at the moment.</p>
          ) : (
            <div className="show-list">
              {/* Map over the shows to display each in a ShowCard component */}
              {shows.map((show) => (
                <ShowCard key={show.id} show={show} />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ShowList;

