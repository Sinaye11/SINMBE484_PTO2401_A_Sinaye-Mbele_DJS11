// src/pages/Favourites.js
import React, { useState } from 'react';
import { useFavourites } from '../context/FavouritesContext';

const genreMap = {
  1: 'Personal Growth',
  2: 'Investigative Journalism',
  3: 'History',
  4: 'Comedy',
  5: 'Entertainment',
  6: 'Business',
  7: 'Fiction',
  8: 'News',
  9: 'Kids and Family'
};

const Favourites = ({ setCurrentEpisode, setIsPlaying, currentlyPlaying, isPlaying }) => {
  const { favourites, removeFavourite } = useFavourites();
  const [sortOrder, setSortOrder] = useState('title-asc');
  const [selectedGenre, setSelectedGenre] = useState('');

  const handlePlayPause = (episode) => {
    if (currentlyPlaying && currentlyPlaying.id === episode.id && isPlaying) {
      setIsPlaying(false); // Pause if the same episode is playing
    } else {
      setCurrentEpisode(episode); // Set the selected episode for playback
      setIsPlaying(true); // Start playing
    }
    console.log(`Play/Pause triggered for episode ID: ${episode.id}`);
  };

  const handleRemoveFavourite = (episodeId) => {
    removeFavourite(episodeId);
    console.log(`Remove triggered for episode ID: ${episodeId}`);
  };

  return (
    <div>
      <h2>Favourites</h2>

      {/* Genre Filter */}
      <div>
        <label>Filter by Genre: </label>
        <select value={selectedGenre} onChange={(e) => setSelectedGenre(e.target.value)}>
          <option value="">All Genres</option>
          {Object.entries(genreMap).map(([id, title]) => (
            <option key={id} value={id}>
              {title}
            </option>
          ))}
        </select>
      </div>

      {/* Sort Controls */}
      <div>
        <label>Sort By: </label>
        <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
          <option value="title-asc">Title A-Z</option>
          <option value="title-desc">Title Z-A</option>
          <option value="date-added-desc">Most Recently Added</option>
          <option value="date-added-asc">Oldest Added</option>
        </select>
      </div>

      {/* Render grouped and filtered episodes */}
      {favourites.length > 0 ? (
        favourites.map((episode) => (
          <div key={episode.id} className="favourite-item">
            <div style={{ display: 'flex', alignItems: 'center' }}>
              {episode.image && (
                <img
                  src={episode.image}
                  alt={`${episode.title} cover`}
                  style={{ width: '50px', height: '50px', marginRight: '10px' }}
                />
              )}
              <div>
                <h4>{episode.title}</h4>
                <p><strong>Description:</strong> {episode.description}</p>
                <p><strong>Added At:</strong> {new Date(episode.addedAt).toLocaleString()}</p>
              </div>
            </div>

            {/* Action buttons for play/pause and remove */}
            <div>
              <button onClick={() => handlePlayPause(episode)}>
                {currentlyPlaying && currentlyPlaying.id === episode.id && isPlaying ? 'Pause' : 'Play'}
              </button>
              <button onClick={() => handleRemoveFavourite(episode.id)}>
                Remove
              </button>
            </div>
          </div>
        ))
      ) : (
        <p>No favourites yet!</p>
      )}
    </div>
  );
};

export default Favourites;
