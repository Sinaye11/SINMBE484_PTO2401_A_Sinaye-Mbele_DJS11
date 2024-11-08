// src/pages/Favourites.js
import React, { useEffect, useState } from 'react';
import { useFavourites } from '../context/FavouritesContext';

const Favourites = ({ setCurrentEpisode, setIsPlaying, currentlyPlaying, isPlaying }) => {
  const { favourites, setFavourites, removeFavourite } = useFavourites();
  const [sortOrder, setSortOrder] = useState('title-asc'); // Sorting control
  const [selectedGenre, setSelectedGenre] = useState(''); // Genre filter

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

  // Function to handle play/pause for each episode
  const handlePlayPause = (episode) => {
    if (currentlyPlaying && currentlyPlaying.id === episode.id && isPlaying) {
      setIsPlaying(false); // Pause if the same episode is playing
    } else {
      setCurrentEpisode(episode); // Set the selected episode for playback
      setIsPlaying(true); // Start playing
    }
  };

  const handleRemoveFavourite = (episodeId) => {
    removeFavourite(episodeId);
  };

  // Extract unique genres from favorites
  const genres = [...new Set(favourites.flatMap(episode => episode.genres || []))];

  // Filter and group episodes by genre, show, and season
  const groupedFavourites = favourites
    .filter(episode => !selectedGenre || episode.genres?.includes(selectedGenre))
    .reduce((groups, episode) => {
      const showKey = `${episode.showTitle} - Season ${episode.seasonNumber}`;
      if (!groups[showKey]) {
        groups[showKey] = [];
      }
      groups[showKey].push(episode);
      return groups;
    }, {});

  // Function to sort episodes based on the selected sort order
  const sortFavourites = (episodes) => {
    return episodes.slice().sort((a, b) => {
      switch (sortOrder) {
        case 'title-asc':
          return a.title.localeCompare(b.title);
        case 'title-desc':
          return b.title.localeCompare(a.title);
        case 'date-added-desc':
          return new Date(b.addedAt) - new Date(a.addedAt);
        case 'date-added-asc':
          return new Date(a.addedAt) - new Date(b.addedAt);
        default:
          return 0;
      }
    });
  };

  return (
    <div>
      <h2>Favourites</h2>

      {/* Genre Filter */}
      <div>
        <label>Filter by Genre: </label>
        <select value={selectedGenre} onChange={(e) => setSelectedGenre(e.target.value)}>
          <option value="">All Genres</option>
          {genres.map((genre) => (
            <option key={genre} value={genre}>
              {genre}
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
      {Object.keys(groupedFavourites).length > 0 ? (
        Object.entries(groupedFavourites).map(([groupKey, episodes]) => (
          <div key={groupKey} className="favourite-group">
            <h3>{groupKey}</h3>
            <ul>
              {sortFavourites(episodes).map((episode) => (
                <li key={episode.id} className="favourite-item">
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
                </li>
              ))}
            </ul>
          </div>
        ))
      ) : (
        <p>No favourites yet!</p>
      )}
    </div>
  );
};

export default Favourites;
