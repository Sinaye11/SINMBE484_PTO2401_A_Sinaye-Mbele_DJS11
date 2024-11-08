// ShowList.js
import React from 'react';
import { Link } from 'react-router-dom';
import ShowCard from './ShowCard';
import './ShowList.css';

/**
 * ShowList Component
 * Displays a list of shows as clickable links, each leading to the show's detail page.
 * @param {Array} shows - Array of show objects to display.
 * @param {Function} onSelectShow - Function to handle show selection.
 */
const ShowList = ({ shows, onSelectShow }) => (
  <div className="show-list">
    {/* Map through each show and create a link to the show's detail page */}
    {shows.map((show) => (
      <Link
        to={`/show/${show.id}`}
        key={show.id}
        onClick={() => onSelectShow(show)} // Trigger show selection callback
      >
        {/* Render a ShowCard for each show, passing in the show object */}
        <ShowCard show={show} isDetailView={false} />
      </Link>
    ))}
  </div>
);

export default ShowList;

