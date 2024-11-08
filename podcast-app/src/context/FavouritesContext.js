// src/context/FavouritesContext.js

import React, { createContext, useContext, useEffect, useState } from 'react';

// Create the context for managing favourites
export const FavouritesContext = createContext();

// Custom hook for easy access to the favourites context
export const useFavourites = () => {
  return useContext(FavouritesContext);
};

/**
 * FavouritesProvider Component
 *
 * Provides functionality to manage, add, remove, and reset favourite episodes.
 * Stores favourites in localStorage to maintain them across sessions.
 */
export const FavouritesProvider = ({ children }) => {
  const [favourites, setFavourites] = useState([]);

  // Load favourites from localStorage on initial render
  useEffect(() => {
    const storedFavourites = JSON.parse(localStorage.getItem('favourites')) || [];
    setFavourites(storedFavourites);
  }, []);

  // Save favourites to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('favourites', JSON.stringify(favourites));
  }, [favourites]);

  // Add an episode to favourites if it isn't already present
  const addFavourite = (episode) => {
    setFavourites((prevFavourites) => {
      if (!prevFavourites.some((fav) => fav.id === episode.id)) {
        const newFavourite = {
          ...episode,
          seasonNumber: episode.seasonNumber,
          seasonImage: episode.seasonImage,
          addedAt: new Date().toISOString(),
        };
        return [...prevFavourites, newFavourite];
      }
      return prevFavourites;
    });
  };

  // Remove an episode from favourites by ID
  const removeFavourite = (episodeId) => {
    setFavourites((prevFavourites) => 
      prevFavourites.filter((fav) => fav.id !== episodeId)
    );
  };

  // Check if an episode is marked as a favourite
  const isFavourite = (episodeId) => {
    return favourites.some((fav) => fav.id === episodeId);
  };

  // Reset all favourites and clear them from localStorage
  const resetFavourites = () => {
    setFavourites([]);
    localStorage.removeItem('favourites');
  };

  return (
    <FavouritesContext.Provider
      value={{
        favourites,
        addFavourite,
        removeFavourite,
        isFavourite,
        resetFavourites,
      }}
    >
      {children}
    </FavouritesContext.Provider>
  );
};

