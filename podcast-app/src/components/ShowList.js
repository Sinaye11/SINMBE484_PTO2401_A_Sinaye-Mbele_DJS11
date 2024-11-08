// ShowList.js
import React from 'react';
import { Link } from 'react-router-dom';
import ShowCard from './ShowCard';
import './ShowList.css';

const ShowList = ({ shows, onSelectShow }) => (
  <div className="show-list">
    {shows.map((show) => (
      <Link
        to={`/show/${show.id}`}
        key={show.id}
        onClick={() => {
          onSelectShow(show);
          console.log("Clicked show:", show); // Debugging: verify correct show is passed
        }}
      >
        <ShowCard show={show} isDetailView={false} />
      </Link>
    ))}
  </div>
);

export default ShowList;
