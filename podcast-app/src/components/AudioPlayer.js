import React, { useEffect, useRef, useState } from 'react';

const AudioPlayer = ({ episode, currentlyPlaying, setCurrentlyPlaying, setIsPlaying, isPlaying }) => {
  const audioRef = useRef(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  // Sync the play/pause state with the audio element
  useEffect(() => {
    if (isPlaying && audioRef.current) {
      audioRef.current.play(); // Play the current episode
    } else if (audioRef.current) {
      audioRef.current.pause(); // Pause the audio when not playing
    }
  }, [isPlaying]);

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

  // Handle the play/pause logic for the current episode
  const handleAudioClick = () => {
    // If the clicked episode is already the one currently playing, toggle play/pause
    if (currentlyPlaying?.id === episode.id) {
      setIsPlaying(!isPlaying); // Toggle play/pause when clicking the same episode
    } else {
      // Pause the previously playing audio if a new episode is selected
      if (currentlyPlaying?.id && audioRef.current) {
        audioRef.current.pause();
        setIsPlaying(false); // Stop the previous episode
      }

      // Start playing the selected episode
      setCurrentlyPlaying(episode); // Set the new episode as currently playing
      setIsPlaying(true); // Start playback
    }
  };

  // Handle the seek functionality
  const handleSeekChange = (event) => {
    const newTime = event.target.value;
    setCurrentTime(newTime);
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
    }
  };

  return (
    <div className="audio-player">
      <div className="audio-controls">
        {/* Play/Pause Button */}
        <button onClick={handleAudioClick} className="play-pause-button">
          {isPlaying && currentlyPlaying?.id === episode.id ? 'Pause' : 'Play'}
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
