// src/components/FavouritesList.js
import React from 'react';
import { Link } from 'react-router-dom';

const FavouritesList = ({ favourites, onRemoveFavourite }) => {
  return (
    <div className="favourites-list">
      <h2>My Favourites</h2>
      {favourites.length > 0 ? (
        favourites.map((item) => (
          <div key={item.id} className="favourite-item">
            <h3>{item.title}</h3>
            <Link to={`/show/${item.showId}`}>View Show</Link>
            <button onClick={() => onRemoveFavourite(item.id)}>Remove from Favourites</button>
          </div>
        ))
      ) : (
        <p>No favourites yet!</p>
      )}
    </div>
  );
};

export default FavouritesList;

