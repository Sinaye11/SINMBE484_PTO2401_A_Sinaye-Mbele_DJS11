import React from 'react';
import { Link } from 'react-router-dom';
import './ShowCard.css'; // Import the CSS file to style the ShowCard component

// Individual show card component to display basic show details
const ShowCard = ({ show }) => {
  // Destructuring show properties for easy access
  const { id, title, genre, image } = show;

  return (
    <div className="show-card">
      {/* Show image, if available, otherwise use a fallback */}
      <img src={image || '/assets/default-show-image.jpg'} alt={title} className="show-card-image" />

      {/* Show title */}
      <h2>{title}</h2>

      {/* Show genre */}
      <p><strong>Genre:</strong> {genre}</p>

      {/* Link to the detailed show page */}
      <Link to={`/show/${id}`} className="view-show-details">
        View Show Details
      </Link>
    </div>
  );
};

export default ShowCard;
