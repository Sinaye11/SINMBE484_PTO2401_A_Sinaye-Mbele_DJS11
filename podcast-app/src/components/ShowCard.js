import PropTypes from 'prop-types'; // Import PropTypes for prop validation
import React from 'react';
import { Link } from 'react-router-dom';
import './ShowCard.css';

// Individual show card component to display basic show details
const ShowCard = ({ show }) => {
  // Destructure show properties for easy access
  const { id, title, genre, image, lastUpdated } = show;

  // Format the last updated date to a readable format (e.g., "November 7, 2024")
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date);
  };

  return (
    <div className="show-card">
      {/* Show image, with a fallback */}
      <img src={image || '/assets/default-show-image.jpg'} alt={title} className="show-card-image" />

      {/* Show title */}
      <h2>{title}</h2>

      {/* Show genre */}
      <p><strong>Genre:</strong> {genre}</p>

      {/* Display last updated date */}
      {lastUpdated && (
        <p className="last-updated">
          <strong>Last updated:</strong> {formatDate(lastUpdated)}
        </p>
      )}

      {/* Link to the detailed show page */}
      <Link to={`/show/${id}`} className="view-show-details">
        View Show Details
      </Link>
    </div>
  );
};

ShowCard.propTypes = {
  show: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    genre: PropTypes.string.isRequired,
    image: PropTypes.string,
    lastUpdated: PropTypes.string,
  }).isRequired,
};

export default ShowCard;
