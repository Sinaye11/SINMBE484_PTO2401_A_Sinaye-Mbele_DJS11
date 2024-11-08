// ShowCard.js
import PropTypes from 'prop-types';
import React from 'react';
import './ShowCard.css';

/**
 * ShowCard Component
 * 
 * Displays a card with show details. Supports a detailed view mode that includes episodes.
 *
 * Props:
 * - show: Show data (title, genre, image, last updated, description)
 * - isDetailView: Boolean flag to show additional details (episodes list)
 */
const ShowCard = ({ show, isDetailView = false }) => {
  if (!show) {
    return <p>Loading...</p>; // Show loading text if data is not yet available
  }

  // Destructure show properties with default for genre
  const { title, genre = "Unknown", image, lastUpdated, description } = show;

  // Format the last updated date to a readable format
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(date);
  };

  // Placeholder episodes for detail view
  const mockEpisodes = [
    { id: 1, title: 'Episode 1: Introduction', date: '2 days ago', duration: '45 min' },
    { id: 2, title: 'Episode 2: Deep Dive', date: '5 days ago', duration: '50 min' },
    { id: 3, title: 'Episode 3: Expert Interview', date: '1 week ago', duration: '60 min' },
  ];

  return (
    <div className={isDetailView ? "show-detail" : "show-card"}>
      <div className="show-image-container">
        <img
          src={image || '/assets/default-show-image.jpg'} // Default image if none is provided
          alt={title}
          className="show-card-image"
        />
      </div>
      
      {/* Basic show information */}
      <div className="show-info">
        <h2>{title}</h2>
        <p><strong>Genre:</strong> {genre}</p>
        {lastUpdated && <p><strong>Last updated:</strong> {formatDate(lastUpdated)}</p>}
        <p>{description}</p>
      </div>

      {/* Episodes section for detailed view */}
      {isDetailView && (
        <div className="episodes-section">
          <h3>Episodes</h3>
          <ul className="episodes-list">
            {mockEpisodes.map((episode) => (
              <li key={episode.id} className="episode-item">
                <div className="episode-info">
                  <p className="episode-title">{episode.title}</p>
                  <p className="episode-date">{episode.date}</p>
                </div>
                <p className="episode-duration">{episode.duration}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

// Define prop types for type-checking
ShowCard.propTypes = {
  show: PropTypes.shape({
    title: PropTypes.string.isRequired,
    genre: PropTypes.string,
    image: PropTypes.string,
    lastUpdated: PropTypes.string,
    description: PropTypes.string,
  }),
  isDetailView: PropTypes.bool,
};

export default ShowCard;

