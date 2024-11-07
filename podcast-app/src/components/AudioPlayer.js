import React, { useEffect, useRef } from 'react';

const AudioPlayer = ({ episode, currentlyPlaying, setCurrentlyPlaying, isPlaying, setIsPlaying }) => {
  const audioRef = useRef(null);

  useEffect(() => {
    console.log("Currently Playing:", currentlyPlaying);  // Debugging log
    console.log("Is Playing:", isPlaying);  // Debugging log

    if (currentlyPlaying && currentlyPlaying.id === episode.id) {
      if (isPlaying) {
        console.log("Playing audio...");
        audioRef.current.play();
      } else {
        console.log("Pausing audio...");
        audioRef.current.pause();
      }
    }
  }, [currentlyPlaying, isPlaying, episode.id]);

  const togglePlayPause = () => {
    console.log("Toggling play/pause...");
    if (currentlyPlaying && currentlyPlaying.id === episode.id && isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      setCurrentlyPlaying(episode); // Set the whole episode as currentlyPlaying
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

      <audio ref={audioRef} src={episode.file} controls>
        Your browser does not support the audio element.
      </audio>
    </div>
  );
};

export default AudioPlayer;
