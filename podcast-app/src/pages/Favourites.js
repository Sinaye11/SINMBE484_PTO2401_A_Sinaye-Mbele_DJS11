//Shows a list of favourite episodes

import React, { useEffect } from 'react';
import { useFavourites } from '../context/FavouritesContext';

const Favourites = () => {
  const { favourites, setFavourites, removeFavourite } = useFavourites();

  const handleRemoveFavourite = (episodeId) => {
    removeFavourite(episodeId);
  };

  useEffect(() => {
    const fetchFavourites = async () => {
      try {
        const response = await fetch('/api/favourites');
        if (!response.ok) {
          throw new Error('Failed to fetch favourites');
        }
        const data = await response.json();
        setFavourites(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchFavourites();
  }, [setFavourites]);

  return (
    <div>
      <h2>Favourites</h2>
      <div>
        {favourites.length > 0 ? (
          favourites.map((episode) => (
            <div key={episode.id} className="favourite-episode">
              <h3>{episode.title}</h3>
              <button onClick={() => handleRemoveFavourite(episode.id)}>Remove from Favourites</button>
            </div>
          ))
        ) : (
          <p>No favourites yet!</p>
        )}
      </div>
    </div>
  );
};

export default Favourites;


