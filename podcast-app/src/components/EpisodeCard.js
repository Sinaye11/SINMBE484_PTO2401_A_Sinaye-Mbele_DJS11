import React from 'react';
import { Link } from 'react-router-dom';
import AudioPlayer from './AudioPlayer';

const EpisodeCard = ({ episode }) => {
  return (
    <div className="episode-card">
      <h2>{episode.title}</h2>
      <p>{episode.description}</p>
      <AudioPlayer src={episode.audioUrl} title={episode.title} />
      <Link to={`/show/${episode.showId}/season/${episode.seasonId}`}>View Show Details</Link>
    </div>
  );
};

export default EpisodeCard;
