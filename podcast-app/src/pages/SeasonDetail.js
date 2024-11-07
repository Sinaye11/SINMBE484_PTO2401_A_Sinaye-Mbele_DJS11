import React from 'react';
import AudioPlayer from '../components/AudioPlayer'; // Assuming AudioPlayer component exists

const ShowDetail = ({ shows, currentlyPlaying, setCurrentlyPlaying, isPlaying, setIsPlaying }) => {
  const showId = 1; // Hardcoded for demonstration, replace with dynamic logic
  const show = shows.find((s) => s.id === showId);
  const episodes = show.episodes;

  return (
    <div>
      <h2>{show.title}</h2>
      {episodes.map((episode) => (
        <AudioPlayer
          key={episode.id}
          episode={episode}
          currentlyPlaying={currentlyPlaying}
          setCurrentlyPlaying={setCurrentlyPlaying}
          isPlaying={isPlaying}
          setIsPlaying={setIsPlaying}
        />
      ))}
    </div>
  );
};

export default ShowDetail;
