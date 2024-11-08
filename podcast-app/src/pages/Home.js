import Fuse from 'fuse.js'; // Import for fuzzy search
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Slider from 'react-slick'; // Import for carousel
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
import GenreFilter from '../components/GenreFilter';
import '../pages/Home.css';
import { fetchShows } from '../services/api';

const Home = () => {
  const [shows, setShows] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState('');
  const [query, setQuery] = useState(''); // State for search query

  useEffect(() => {
    fetchShows()
      .then((data) => {
        const sortedShows = data.sort((a, b) => a.title.localeCompare(b.title));
        setShows(sortedShows);
      })
      .catch((error) => {
        console.error('Error fetching shows:', error);
      });
  }, []);

  const fuse = new Fuse(shows, { keys: ['title'], threshold: 0.3 });
  const filteredShows = query
    ? fuse.search(query).map(result => result.item)
    : selectedGenre
    ? shows.filter((show) => show.genres && show.genres.includes(parseInt(selectedGenre)))
    : shows;

  const handleGenreFilterChange = (genre) => {
    setSelectedGenre(genre);
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 768, settings: { slidesToShow: 1 } }
    ]
  };

  const formatDate = (date) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(date).toLocaleDateString(undefined, options);
  };

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

  return (
    <div className="home-page">
      <div className="header">
        <h1>Podcast Shows</h1>
      </div>

      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for a show..."
        className="search-input"
      />

      <GenreFilter
        genres={Object.keys(genreMap)}
        onFilterChange={handleGenreFilterChange}
        currentGenre={selectedGenre}
      />

      <h2>Featured Shows</h2>
      <Slider {...settings}>
        {filteredShows.slice(0, 6).map((show) => (
          <div key={show.id} className="carousel-item">
            <img src={show.image} alt={show.title} className="carousel-image" />
            <h3>{show.title}</h3>
          </div>
        ))}
      </Slider>

      <div className="show-list">
        {filteredShows.map((show) => (
          <div className="show-card" key={show.id}>
            <Link to={`/show/${show.id}`}>
              <img src={show.image} alt={show.title} className="show-image" />
            </Link>
            <h3 className="show-title">{show.title}</h3>
            {show.updated && (
              <p className="last-modified">Last Updated: {formatDate(show.updated)}</p>
            )}
            {show.genres && show.genres.length > 0 && (
              <p className="genre">
                Genre: {show.genres.map((genreId) => genreMap[genreId] || 'Unknown').join(', ')}
              </p>
            )}
            <Link to={`/show/${show.id}`} className="more-info-button">
              More Info
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
