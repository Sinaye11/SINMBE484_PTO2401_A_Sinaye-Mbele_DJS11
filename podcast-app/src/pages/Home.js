import React, { useEffect, useState } from 'react';
import GenreFilter from '../components/GenreFilter';
import ShowCard from '../components/ShowCard';
import { fetchShows } from '../services/api';

const Home = () => {
  const [shows, setShows] = useState([]);
  const [filteredShows, setFilteredShows] = useState([]);
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState('');

  useEffect(() => {
    fetchShows().then((data) => {
      setShows(data);
      setFilteredShows(data);
      const allGenres = [...new Set(data.map((show) => show.genre))];
      setGenres(allGenres);
    });
  }, []);

  const handleFilterChange = (genre) => {
    setSelectedGenre(genre);
    if (genre) {
      setFilteredShows(shows.filter((show) => show.genre === genre));
    } else {
      setFilteredShows(shows);
    }
  };

  return (
    <div className="home-page">
      <h1>Welcome to Podcast App</h1>
      <GenreFilter genres={genres} onFilterChange={handleFilterChange} />
      <div className="show-list">
        {filteredShows.map((show) => (
          <ShowCard key={show.id} show={show} />
        ))}
      </div>
    </div>
  );
};

export default Home;
