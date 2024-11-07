//Audio player to listen to episodes

import React, { useEffect, useRef, useState } from 'react';

// AudioPlayer component to play podcast episodes
const AudioPlayer = ({ episode, onFavorite, isFavorite }) => {
  const [isPlaying, setIsPlaying] = useState(false); // State to track if the audio is playing
  const [progress, setProgress] = useState(0); // State to track the current progress of the audio
  const audioRef = useRef(null); // Reference to the audio element

  useEffect(() => {
    // If the audio is playing, update the progress every second
    if (isPlaying) {
      const interval = setInterval(() => {
        if (audioRef.current) {
          setProgress((audioRef.current.currentTime / audioRef.current.duration) * 100);
        }
      }, 1000);
      return () => clearInterval(interval); // Clear the interval when the component is unmounted or isPlaying changes
    }
  }, [isPlaying]);

  const togglePlayPause = () => {
    // Toggle play/pause
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleFavorite = () => {
    // Call the onFavorite callback to handle adding/removing from favorites
    onFavorite(episode);
  };

  return (
    <div className="audio-player">
      <h3>{episode.title}</h3>
      <p>{episode.description}</p>
      
      {/* Audio control buttons */}
      <button onClick={togglePlayPause}>
        {isPlaying ? 'Pause' : 'Play'}
      </button>

      {/* Favorite button */}
      <button onClick={handleFavorite}>
        {isFavorite ? 'Unfavorite' : 'Favorite'}
      </button>

      {/* Audio player element */}
      <audio ref={audioRef} src={episode.audioUrl} />
      
      {/* Progress bar showing the current play progress */}
      <div className="progress-bar">
        <div
          className="progress"
          style={{ width: `${progress}%` }}
        ></div>
      </div>

      {/* Optionally, you could add additional metadata like duration */}
      <div className="audio-duration">
        <span>{Math.floor(progress)}%</span>
      </div>
    </div>
  );
};

export default AudioPlayer;
