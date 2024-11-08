// src/components/ShowDetailWrapper.js

/**
 * ShowDetailWrapper Component
 *
 * Purpose:
 * - Displays details of a selected show, including its title, description, image, and list of seasons and episodes.
 * - Provides functionality to play episodes and manage favourites.
 * - Fetches data based on the show ID from the URL parameters.
 */

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useFavourites } from '../context/FavouritesContext';
import { fetchShowDetails } from '../services/api';

const ShowDetailWrapper = ({ setCurrentEpisode, setIsPlaying }) => {
  const { id } = useParams(); // Get show ID from URL parameters
  const showId = Number(id); // Convert ID to a number
  const [selectedShow, setSelectedShow] = useState(null);
  const [loading, setLoading] = useState(true);

  // Favourites functions from context
  const { addFavourite, removeFavourite, isFavourite } = useFavourites();

  // Fetch show details when component mounts or showId changes
  useEffect(() => {
    const loadShowDetails = async () => {
      try {
        const showDetails = await fetchShowDetails(showId);
        setSelectedShow(showDetails); // Set the show data on successful fetch
      } catch (error) {
        console.error('Error fetching show details:', error);
      } finally {
        setLoading(false); // Stop loading spinner after fetch
      }
    };
    loadShowDetails();
  }, [showId]);

  // Display loading state or error message if show data is missing
  if (loading) return <p>Loading show details...</p>;
  if (!selectedShow) return <p>Show not found.</p>;

  return (
    <div>
      {/* Show Title and Image */}
      <h1>{selectedShow.title}</h1>
      {selectedShow.image && (
        <img
          src={selectedShow.image}
          alt={`${selectedShow.title} cover`}
          style={{
            width: '100%',
            maxWidth: '400px',
            borderRadius: '8px',
            marginBottom: '20px',
          }}
        />
      )}
      <p>{selectedShow.description}</p>

      {/* Seasons and Episodes List */}
      <h2>Seasons</h2>
      {selectedShow.seasons && selectedShow.seasons.length > 0 ? (
        selectedShow.seasons.map((season, seasonIndex) => (
          <div key={season.id} className="season-container">
            <h3>
              Season {seasonIndex + 1} ({season.episodes?.length || 0} episodes)
            </h3>
            <ul className="episodes-list">
              {season.episodes && season.episodes.length > 0 ? (
                season.episodes.map((episode, episodeIndex) => {
                  // Prepare data for episode, including show info
                  const episodeData = {
                    ...episode,
                    showTitle: selectedShow.title,
                    showImage: selectedShow.image,
                    episodeNumber: episodeIndex + 1,
                    seasonNumber: seasonIndex + 1,
                  };

                  const favourite = isFavourite(episode.id); // Check if episode is a favourite

                  return (
                    <li key={episode.id} className="episode-item">
                      <div>
                        {/* Episode title, clickable to play */}
                        <p
                          className="episode-title"
                          onClick={() => {
                            setCurrentEpisode(episodeData); // Set current episode
                            setIsPlaying(true); // Start playback
                          }}
                          style={{ cursor: 'pointer', color: 'blue' }}
                        >
                          Episode {episodeIndex + 1}: {episode.title}
                        </p>
                        <p className="episode-description">{episode.description}</p>
                        <p className="episode-date">{episode.date}</p>
                        <button
                          onClick={() => {
                            favourite ? removeFavourite(episode.id) : addFavourite(episodeData); // Toggle favourite
                          }}
                        >
                          {favourite ? 'Remove from Favourites' : 'Add to Favourites'}
                        </button>
                      </div>
                      <p className="episode-duration">{episode.duration}</p>
                    </li>
                  );
                })
              ) : (
                <li>No episodes available for this season.</li> // Message if no episodes
              )}
            </ul>
          </div>
        ))
      ) : (
        <p>No seasons available for this show.</p> // Message if no seasons
      )}
    </div>
  );
};

export default ShowDetailWrapper;

