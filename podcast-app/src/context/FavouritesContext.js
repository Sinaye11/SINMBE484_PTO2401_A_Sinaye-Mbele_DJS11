// src/context/FavouritesContext.js
import React, { createContext, useContext, useState } from 'react';

// Create the FavouritesContext
export const FavouritesContext = createContext();  // Make sure this is exported

// Custom hook to use the context
export const useFavourites = () => {
  return useContext(FavouritesContext);
};

// Provider component
export const FavouritesProvider = ({ children }) => {
  const [favourites, setFavourites] = useState([]);
  const [sortOrder, setSortOrder] = useState('asc'); // Default to ascending

  // Function to add a favourite
  const addFavourite = (episode) => {
    setFavourites((prev) => [...prev, episode]);
  };

  // Function to toggle sorting order
  const toggleSortOrder = () => {
    setSortOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'));
  };

  // Function to get sorted favourites
  const sortedFavourites = () => {
    return [...favourites].sort((a, b) => {
      const titleA = a.title.toLowerCase();
      const titleB = b.title.toLowerCase();
      if (sortOrder === 'asc') {
        return titleA < titleB ? -1 : titleA > titleB ? 1 : 0;
      } else {
        return titleA > titleB ? -1 : titleA < titleB ? 1 : 0;
      }
    });
  };

  return (
    <FavouritesContext.Provider value={{ favourites, addFavourite, sortedFavourites, toggleSortOrder }}>
      {children}
    </FavouritesContext.Provider>
  );
};
