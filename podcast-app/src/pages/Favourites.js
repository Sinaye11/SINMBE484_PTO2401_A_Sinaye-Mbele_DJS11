// src/pages/Favourites.js
import React, { useEffect, useState } from 'react';
import FavouritesList from '../components/FavouritesList';
import { getStoredFavourites, removeFromFavourites, saveToFavourites } from '../utils/localStorage';

const Favourites = () => {
  const [favourites, setFavourites] = useState([]);

  useEffect(() => {
    // Load favourites from local storage on component mount
    setFavourites(getStoredFavourites());
  }, []);

  const handleAddFavourite = (item) => {
    saveToFavourites(item);
    setFavourites(getStoredFavourites()); // Update state with new favorites list
  };

  const handleRemoveFavourite = (id) => {
    removeFromFavourites(id);
    setFavourites(getStoredFavourites()); // Update state with new favorites list
  };

  return (
    <div className="favourites-page">
      <h1>My Favourites</h1>
      <FavouritesList favourites={favourites} onRemoveFavourite={handleRemoveFavourite} />
    </div>
  );
};

export default Favourites;


