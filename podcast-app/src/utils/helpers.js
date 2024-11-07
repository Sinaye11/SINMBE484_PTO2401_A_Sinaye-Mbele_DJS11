// src/utils/helpers.js

// Retrieve the list of favourites from localStorage
// Returns an array of favourite items or an empty array if none are found
export const getStoredFavourites = () => {
  // Retrieve the 'favourites' item from localStorage
  const favourites = localStorage.getItem('favourites');
  
  // Parse and return the favourites array if it exists, otherwise return an empty array
  return favourites ? JSON.parse(favourites) : [];
};

// Save a show or episode to favourites in localStorage
// Ensures that the item isn't duplicated in the list
export const saveToFavourites = (item) => {
  // Retrieve the current list of favourites from localStorage
  const favourites = getStoredFavourites();
  
  // Check if the item is already in the favourites list by comparing the 'id'
  if (!favourites.find(fav => fav.id === item.id)) {
    // If not, add the item to the favourites list
    favourites.push(item);
    
    // Save the updated favourites list back to localStorage
    localStorage.setItem('favourites', JSON.stringify(favourites));
  }
};

// Remove a specific item from favourites by its 'id'
// Updates the favourites list in localStorage
export const removeFromFavourites = (id) => {
  // Retrieve the current favourites list and filter out the item with the given 'id'
  const favourites = getStoredFavourites().filter(fav => fav.id !== id);
  
  // Save the updated list back to localStorage
  localStorage.setItem('favourites', JSON.stringify(favourites));
};
