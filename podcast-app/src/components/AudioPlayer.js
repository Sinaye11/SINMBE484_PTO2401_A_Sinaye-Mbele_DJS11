import React, { useEffect, useRef } from 'react';

const AudioPlayer = ({ episode, currentlyPlaying, setCurrentlyPlaying, isPlaying, setIsPlaying }) => {
  const audioRef = useRef(null);

  useEffect(() => {
    if (currentlyPlaying === episode.id && isPlaying) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  }, [currentlyPlaying, isPlaying, episode.id]);

  const togglePlayPause = () => {
    if (currentlyPlaying === episode.id && isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      setCurrentlyPlaying(episode.id);
      setIsPlaying(true);
    }
  };

  return (
    <div className="audio-player">
      <h3>{episode.title}</h3>
      <p>{episode.description}</p>
      
      <button onClick={togglePlayPause}>
        {isPlaying ? 'Pause' : 'Play'}
      </button>

      <audio ref={audioRef} src={episode.audio_url} controls>
        Your browser does not support the audio element.
      </audio>
    </div>
  );
};

export default AudioPlayer;
