//Context to manage favourites

import React, { createContext, useContext, useState } from 'react';

// Exporting FavouritesContext to make it accessible for imports
export const FavouritesContext = createContext();

export const useFavourites = () => {
  return useContext(FavouritesContext);
};

export const FavouritesProvider = ({ children }) => {
  const [favourites, setFavourites] = useState([]);

  const addFavourite = (episode) => {
    setFavourites((prevFavourites) => {
      if (!prevFavourites.some((fav) => fav.id === episode.id)) {
        return [...prevFavourites, episode];
      }
      return prevFavourites;
    });
  };

  const removeFavourite = (episodeId) => {
    setFavourites((prevFavourites) =>
      prevFavourites.filter((fav) => fav.id !== episodeId)
    );
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
