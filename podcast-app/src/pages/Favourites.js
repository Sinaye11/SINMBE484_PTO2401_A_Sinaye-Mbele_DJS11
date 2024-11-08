// src/pages/Favourites.js
import React, { useEffect, useState } from 'react';
import AudioPlayer from '../components/AudioPlayer';
import { useFavourites } from '../context/FavouritesContext';

const Favourites = () => {
  const { favourites, removeFavourite } = useFavourites();
  const [currentlyPlaying, setCurrentlyPlaying] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    console.log("Favourites on Favourites page load:", favourites);
  }, [favourites]);

  const handlePlayPause = (episode) => {
    if (currentlyPlaying && currentlyPlaying.id === episode.id) {
      setIsPlaying(!isPlaying);
    } else {
      setCurrentlyPlaying(episode);
      setIsPlaying(true);
    }
  };

  return (
    <div>
      <h2>Favourites</h2>
      {favourites.length > 0 ? (
        <ul>
          {favourites.map((episode) => (
            <li key={episode.id} className="favourite-item">
              <div className="favourite-content">
                {/* Display the season image if available */}
                {episode.seasonImage && (
                  <img
                    src={episode.seasonImage}
                    alt={episode.title}
                    className="favourite-image"
                    style={{ width: '50px', marginRight: '10px' }}
                  />
                )}
                <h3>{episode.title}</h3>
                <p><strong>Season:</strong> {episode.seasonNumber}</p>
                <p><strong>Description:</strong> {episode.description}</p>
                <p><strong>Added At:</strong> {new Date(episode.addedAt).toLocaleString()}</p>

                {/* Play/Pause button to control audio */}
                <button onClick={() => handlePlayPause(episode)}>
                  {currentlyPlaying && currentlyPlaying.id === episode.id && isPlaying ? 'Pause' : 'Play'}
                </button>

                <button onClick={() => removeFavourite(episode.id)}>Remove from Favourites</button>
              </div>
              
              {/* AudioPlayer component only renders if the episode has an audio file */}
              {currentlyPlaying && currentlyPlaying.id === episode.id && (
                <AudioPlayer
                  episode={currentlyPlaying}
                  isPlaying={isPlaying}
                  setIsPlaying={setIsPlaying}
                  handlePlayPause={() => handlePlayPause(episode)}
                />
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p>No favourites yet!</p>
      )}
    </div>
  );
};

export default Favourites;
