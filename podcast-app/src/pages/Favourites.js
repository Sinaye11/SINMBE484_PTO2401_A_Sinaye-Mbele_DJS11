// src/pages/Favourites.js
import React from 'react';
import { useFavourites } from '../context/FavouritesContext';

const Favourites = () => {
  const { sortedFavourites, toggleSortOrder } = useFavourites();

  return (
    <div>
      <h2>My Favourite Episodes</h2>

      {/* Button to toggle sort order */}
      <button onClick={toggleSortOrder}>
        Sort {sortedFavourites().length > 0 && sortedFavourites()[0].title < sortedFavourites()[sortedFavourites().length - 1].title ? 'Z-A' : 'A-Z'}
      </button>

      {/* Display sorted favourites */}
      <ul>
        {sortedFavourites().map((episode, index) => (
          <li key={index}>
            <h3>{episode.title}</h3>
            {/* Additional episode info */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Favourites;



