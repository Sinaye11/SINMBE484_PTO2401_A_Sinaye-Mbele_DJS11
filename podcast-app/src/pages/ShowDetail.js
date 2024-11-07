import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import EpisodeCard from '../components/EpisodeCard';
import { fetchShowDetails } from '../services/api';

const ShowDetail = () => {
  const { id } = useParams();
  const [showDetails, setShowDetails] = useState(null);

  useEffect(() => {
    fetchShowDetails(id).then((data) => {
      setShowDetails(data);
    });
  }, [id]);

  if (!showDetails) return <div>Loading...</div>;

  return (
    <div className="show-detail">
      <h2>{showDetails.title}</h2>
      <p>{showDetails.description}</p>
      <div className="episodes-list">
        {showDetails.episodes.map((episode) => (
          <EpisodeCard key={episode.id} episode={episode} />
        ))}
      </div>
    </div>
  );
};

export default ShowDetail;
