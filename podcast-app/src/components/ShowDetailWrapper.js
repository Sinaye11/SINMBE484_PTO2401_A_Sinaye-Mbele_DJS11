// src/components/ShowDetailWrapper.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useFavourites } from '../context/FavouritesContext';
import { fetchShowDetails } from '../services/api';

const ShowDetailWrapper = ({ setCurrentEpisode, setIsPlaying }) => {
  const { id } = useParams();
  const showId = Number(id);
  const [selectedShow, setSelectedShow] = useState(null);
  const [loading, setLoading] = useState(true);

  const { addFavourite, removeFavourite, isFavourite } = useFavourites();

  useEffect(() => {
    const loadShowDetails = async () => {
      try {
        const showDetails = await fetchShowDetails(showId);
        setSelectedShow(showDetails);
      } catch (error) {
        console.error('Error fetching show details:', error);
      } finally {
        setLoading(false);
      }
    };
    loadShowDetails();
  }, [showId]);

  if (loading) {
    return <p>Loading show details...</p>;
  }

  if (!selectedShow) {
    return <p>Show not found.</p>;
  }

  return (
    <div>
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
                  const episodeData = {
                    ...episode,
                    showTitle: selectedShow.title,
                    showImage: selectedShow.image,
                    episodeNumber: episodeIndex + 1,
                    seasonNumber: seasonIndex + 1,
                  };

                  const favourite = isFavourite(episode.id);

                  return (
                    <li key={episode.id} className="episode-item">
                      <div>
                        <p
                          className="episode-title"
                          onClick={() => {
                            setCurrentEpisode(episodeData);
                            setIsPlaying(true);
                          }}
                          style={{ cursor: 'pointer', color: 'blue' }}
                        >
                          Episode {episodeIndex + 1}: {episode.title}
                        </p>
                        <p className="episode-description">{episode.description}</p>
                        <p className="episode-date">{episode.date}</p>
                        <button
                          onClick={() => {
                            if (favourite) {
                              removeFavourite(episode.id);
                            } else {
                              addFavourite(episodeData);
                            }
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
                <li>No episodes available for this season.</li>
              )}
            </ul>
          </div>
        ))
      ) : (
        <p>No seasons available for this show.</p>
      )}
    </div>
  );
};

export default ShowDetailWrapper;
