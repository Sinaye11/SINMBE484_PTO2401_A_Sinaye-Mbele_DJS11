// App.js
import React, { useEffect, useState } from 'react';
import { Route, BrowserRouter as Router, Routes, useParams } from 'react-router-dom';
import './App.css';
import AudioPlayer from './components/AudioPlayer';
import Sidebar from './components/SideBar';
import Favourites from './pages/Favourites';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import { fetchShowDetails, fetchShows } from './services/api';

const genreMapping = {
  1: 'Personal Growth',
  2: 'Investigative Journalism',
  3: 'History',
  4: 'Comedy',
  5: 'Entertainment',
  6: 'Business',
  7: 'Fiction',
  8: 'News',
  9: 'Kids and Family',
};

// ShowDetailWrapper component
const ShowDetailWrapper = ({ setCurrentEpisode, setIsPlaying }) => {
  const { id } = useParams();
  const showId = Number(id);
  const [selectedShow, setSelectedShow] = useState(null);
  const [loading, setLoading] = useState(true);

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

  const genreName = genreMapping[selectedShow.genre] || selectedShow.genre?.name || 'Unknown';

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
      <p>
        <strong>Genre:</strong> {genreName}
      </p>
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
                season.episodes.map((episode, episodeIndex) => (
                  <li key={episode.id} className="episode-item">
                    <div>
                      <p
                        className="episode-title"
                        onClick={() => {
                          setCurrentEpisode({
                            ...episode,
                            showTitle: selectedShow.title,
                            showImage: selectedShow.image,
                            episodeNumber: episodeIndex + 1, // Add episode number
                          });
                          setIsPlaying(true);
                        }}
                        style={{ cursor: 'pointer', color: 'blue' }}
                      >
                        Episode {episodeIndex + 1}: {episode.title}
                      </p>
                      <p className="episode-description">{episode.description}</p>
                      <p className="episode-date">{episode.date}</p>
                    </div>
                    <p className="episode-duration">{episode.duration}</p>
                  </li>
                ))
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

const App = () => {
  const [shows, setShows] = useState([]);
  const [error, setError] = useState(null);
  const [currentEpisode, setCurrentEpisode] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const loadShows = async () => {
      try {
        const data = await fetchShows();
        const sortedData = data.sort((a, b) => a.title.localeCompare(b.title));
        setShows(sortedData);
      } catch (error) {
        setError('Failed to fetch shows.');
      }
    };
    loadShows();
  }, []);

  return (
    <Router>
      <div className="app-layout">
        <Sidebar />

        <AudioPlayer
          episode={currentEpisode}
          isPlaying={isPlaying}
          setIsPlaying={setIsPlaying}
        />

        <main className="content">
          {error && <div className="app-error">{error}</div>}
          <Routes>
            <Route path="/" element={<Home shows={shows} />} />
            <Route
              path="/show/:id"
              element={
                <ShowDetailWrapper
                  setCurrentEpisode={setCurrentEpisode}
                  setIsPlaying={setIsPlaying}
                />
              }
            />
            <Route path="/favourites" element={<Favourites />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
