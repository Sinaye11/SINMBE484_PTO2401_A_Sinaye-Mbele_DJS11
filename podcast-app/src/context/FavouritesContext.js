// src/context/FavouritesContext.js
import React, { createContext, useContext, useEffect, useState } from 'react';

export const FavouritesContext = createContext();

export const useFavourites = () => {
  return useContext(FavouritesContext);
};

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

  const addFavourite = (episode) => {
    setFavourites((prevFavourites) => {
      // Check if the episode already exists to prevent duplicates
      if (!prevFavourites.some((fav) => fav.id === episode.id)) {
        // Create a new favourite object with full details and timestamp
        const newFavourite = {
          ...episode,
          seasonNumber: episode.seasonNumber,
          seasonImage: episode.seasonImage, // Ensure this includes the season image
          addedAt: new Date().toISOString(),
        };
        const updatedFavourites = [...prevFavourites, newFavourite]; // Accumulate favorites
        console.log("Updated favourites list:", updatedFavourites); // Debugging output
        return updatedFavourites;
      }
      return prevFavourites;
    });
  };

  const removeFavourite = (episodeId) => {
    setFavourites((prevFavourites) => {
      const updatedFavourites = prevFavourites.filter((fav) => fav.id !== episodeId);
      console.log("Updated favourites after removal:", updatedFavourites); // Debugging output
      return updatedFavourites;
    });
  };

  const isFavourite = (episodeId) => {
    return favourites.some((fav) => fav.id === episodeId);
  };

  return (
    <FavouritesContext.Provider
      value={{ favourites, addFavourite, removeFavourite, isFavourite }}
    >
      {children}
    </FavouritesContext.Provider>
  );
};
