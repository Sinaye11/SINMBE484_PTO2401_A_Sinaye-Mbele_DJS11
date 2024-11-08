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
      if (!prevFavourites.some((fav) => fav.id === episode.id)) {
        const newFavourite = {
          ...episode,
          seasonNumber: episode.seasonNumber,
          seasonImage: episode.seasonImage,
          addedAt: new Date().toISOString(),
        };
        const updatedFavourites = [...prevFavourites, newFavourite];
        console.log("Updated favourites list:", updatedFavourites);
        return updatedFavourites;
      }
      return prevFavourites;
    });
  };

  const removeFavourite = (episodeId) => {
    setFavourites((prevFavourites) => {
      const updatedFavourites = prevFavourites.filter((fav) => fav.id !== episodeId);
      console.log("Updated favourites after removal:", updatedFavourites);
      return updatedFavourites;
    });
  };

  const isFavourite = (episodeId) => {
    return favourites.some((fav) => fav.id === episodeId);
  };

  // Reset favourites and clear from localStorage
  const resetFavourites = () => {
    setFavourites([]); // Clear the state
    localStorage.removeItem('favourites'); // Clear favourites from localStorage
    console.log("Favourites reset");
  };

  return (
    <FavouritesContext.Provider
      value={{
        favourites,
        addFavourite,
        removeFavourite,
        isFavourite,
        resetFavourites, // Make resetFavourites available in context
      }}
    >
      {children}
    </FavouritesContext.Provider>
  );
};
