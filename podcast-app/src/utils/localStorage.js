// src/utils/localStorage.js

export const getStoredFavourites = () => {
    const favourites = localStorage.getItem('favourites');
    return favourites ? JSON.parse(favourites) : [];
  };
  
  export const saveToFavourites = (item) => {
    const favourites = getStoredFavourites();
    // Check if the item already exists in favourites
    if (!favourites.find(fav => fav.id === item.id)) {
      favourites.push(item);
      localStorage.setItem('favourites', JSON.stringify(favourites));
    }
  };
  
  export const removeFromFavourites = (id) => {
    const favourites = getStoredFavourites().filter(fav => fav.id !== id);
    localStorage.setItem('favourites', JSON.stringify(favourites));
  };
  