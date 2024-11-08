// ShowList.js
import React from 'react';
import { Link } from 'react-router-dom';
import ShowCard from './ShowCard';
import './ShowList.css';

/**
 * ShowList Component
 * Displays a list of shows as clickable links, each leading to the show's detail page.
 * 
 * Props:
 * - shows: Array of show objects to display.
 * - onSelectShow: Function to handle show selection.
 */
const ShowList = ({ shows, onSelectShow }) => (
  <div className="show-list">
    {/*
      Iterate over each show in the "shows" array to create a clickable link for each.
      The "key" prop here is important for React to uniquely identify each child component
      when the list is rendered. Using show.id ensures each link has a unique key.
    */}
    {shows.map((show) => (
      <Link
        to={`/show/${show.id}`} // Set the path to navigate to the specific show's detail page
        key={show.id} // Unique key for each show item
        onClick={() => onSelectShow(show)} // Trigger the callback to indicate which show was selected
      >
        {/*
          Render the ShowCard component for each show.
          The "isDetailView" prop is set to "false" here because this component is intended for listing shows,
          not showing detailed information about each one. This helps ShowCard determine what level of information to display.
        */}
        <ShowCard show={show} isDetailView={false} />
      </Link>
    ))}
  </div>
);

export default ShowList;


