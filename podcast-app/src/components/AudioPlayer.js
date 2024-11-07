import React, { useEffect, useRef, useState } from 'react';
//import './AudioPlayer.css';

const AudioPlayer = ({ episode }) => {
  const audioRef = useRef(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false); // Whether the episode is playing
  const [currentlyPlaying, setCurrentlyPlaying] = useState(null); // Track the currently playing episode

  // Sync the play/pause state with the audio element
  useEffect(() => {
    if (isPlaying && audioRef.current) {
      audioRef.current.play(); // Play the current episode
    } else if (audioRef.current) {
      audioRef.current.pause(); // Pause the audio when not playing
    }
  }, [isPlaying]); // Only sync play/pause state when 'isPlaying' changes

  // Update current time and duration when audio is playing
  useEffect(() => {
    const interval = setInterval(() => {
      if (audioRef.current) {
        setCurrentTime(audioRef.current.currentTime);
        setDuration(audioRef.current.duration);
      }
    }, 1000);

    return () => clearInterval(interval); // Clean up the interval on unmount
  }, [isPlaying]);

  // Handle the audio file change when a new episode is selected
  useEffect(() => {
    if (currentlyPlaying && currentlyPlaying.id !== episode.id) {
      setIsPlaying(false); // Stop the previous episode if it's a new episode
    }
  }, [episode, currentlyPlaying]); // When the episode or 'currentlyPlaying' changes

  // Handle the play/pause logic for the current episode
  const handleAudioClick = () => {
    if (currentlyPlaying && currentlyPlaying.id === episode.id) {
      // If this episode is already playing, toggle play/pause
      setIsPlaying(!isPlaying);
    } else {
      // If it's a new episode, set it as currently playing and start playing it
      setCurrentlyPlaying(episode); // Set the current episode as playing
      setIsPlaying(true); // Start playing the new episode
    }
  };

  // Handle the seek functionality
  const handleSeekChange = (event) => {
    const newTime = event.target.value;
    setCurrentTime(newTime);
    audioRef.current.currentTime = newTime; // Seek to the new time in the audio
  };

  return (
    <div className="audio-player">
      <div className="audio-controls">
        {/* Play/Pause Button */}
        <button onClick={handleAudioClick} className="play-pause-button">
          {isPlaying && currentlyPlaying.id === episode.id ? 'Pause' : 'Play'}
        </button>

        {/* Audio progress tracker */}
        <div className="progress-bar-container">
          <input
            type="range"
            min="0"
            max={duration}
            value={currentTime}
            onChange={handleSeekChange}
            className="progress-bar"
          />
          <div className="progress-time">
            <span>{Math.floor(currentTime)}s</span> / <span>{Math.floor(duration)}s</span>
          </div>
        </div>
      </div>

      {/* Audio element */}
      <audio
        ref={audioRef}
        src={episode.file}  // Assuming the episode object has a 'file' property with audio URL
        onEnded={() => setIsPlaying(false)}  // Automatically stop when the audio ends
        preload="metadata"
      />

      {/* Display current playback status */}
      <p>{currentlyPlaying?.id === episode.id ? 'Now playing: ' + episode.title : 'Click to play'}</p>
    </div>
  );
};

export default AudioPlayer;
