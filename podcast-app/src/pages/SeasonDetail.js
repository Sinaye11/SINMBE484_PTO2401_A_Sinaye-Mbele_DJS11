import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import EpisodeCard from '../components/EpisodeCard';
import { fetchSeasonDetails } from '../services/api';

const SeasonDetail = () => {
  const { id, seasonId } = useParams();
  const [seasonDetails, setSeasonDetails] = useState(null);

  useEffect(() => {
    fetchSeasonDetails(id, seasonId).then((data) => {
      setSeasonDetails(data);
    });
  }, [id, seasonId]);

  if (!seasonDetails) return <div>Loading...</div>;

  return (
    <div className="season-detail">
      <h2>Season {seasonDetails.number}</h2>
      <div className="episodes-list">
        {seasonDetails.episodes.map((episode) => (
          <EpisodeCard key={episode.id} episode={episode} />
        ))}
      </div>
    </div>
  );
};

export default SeasonDetail;
