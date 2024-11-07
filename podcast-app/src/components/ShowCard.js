import React from 'react';
import { Link } from 'react-router-dom';

const ShowCard = ({ show }) => {
  return (
    <div className="show-card">
      <h2>{show.title}</h2>
      <p>{show.genre}</p>
      <Link to={`/show/${show.id}`}>View Show Details</Link>
    </div>
  );
};

export default ShowCard;
