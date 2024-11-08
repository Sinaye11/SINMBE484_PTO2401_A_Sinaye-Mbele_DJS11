// src/components/AudioPlayer.js
import React, { useEffect, useRef, useState } from 'react';
import { FaMusic } from 'react-icons/fa';
import './AudioPlayer.css';

const AudioPlayer = ({ episode, isPlaying, setIsPlaying }) => {
  // Reference for the audio element
  const audioRef = useRef(null);

  // State to track current playback time and audio duration
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  // Load previously saved playback progress from localStorage when a new episode loads
  useEffect(() => {
    if (episode) {
      const savedProgress = localStorage.getItem(`progress_${episode.id}`);
      if (savedProgress) setCurrentTime(parseFloat(savedProgress));
    }
  }, [episode]);

  // Automatically play or pause the audio based on `isPlaying` state
  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      if (isPlaying && episode) {
        audio.play();
      } else {
        audio.pause();
      }
    }
  }, [isPlaying, episode]);

  // Update current time while playing and save it in localStorage
  useEffect(() => {
    const audio = audioRef.current;

    // Update current time and save to localStorage
    const updateTime = () => {
      setCurrentTime(audio.currentTime);
      localStorage.setItem(`progress_${episode.id}`, audio.currentTime);
    };

    // Set audio duration when metadata is loaded
    const updateDuration = () => {
      setDuration(audio.duration);
    };

    // Attach event listeners to update time and duration
    if (audio) {
      audio.addEventListener('timeupdate', updateTime);
      audio.addEventListener('loadedmetadata', updateDuration);
    }

    // Cleanup event listeners on component unmount or when episode changes
    return () => {
      if (audio) {
        audio.removeEventListener('timeupdate', updateTime);
        audio.removeEventListener('loadedmetadata', updateDuration);
      }
    };
  }, [episode]);

  // Toggle play/pause state when button is clicked
  const handlePlayPause = () => {
    if (episode) {
      setIsPlaying(!isPlaying);
    }
  };

  // Handle seek bar input to change playback time
  const handleSeek = (e) => {
    const newTime = e.target.value;
    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
    localStorage.setItem(`progress_${episode.id}`, newTime);
  };

  // Format time into minutes and seconds for display
  const formatTime = (time) => {
    if (isNaN(time)) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60).toString().padStart(2, '0');
    return `${minutes}:${seconds}`;
  };

  // Set dynamic class names based on episode and playback state
  const playerClassName = `audio-player ${episode ? 'active' : 'inactive'} ${isPlaying ? 'pulsating' : ''}`;

  return (
    <div className={playerClassName}>
      {episode ? (
        <>
          {/* Display episode information including title and image */}
          <div className="audio-info">
            <img
              src={episode.showImage}
              alt={`${episode.showTitle} cover`}
              className="audio-player-image"
            />
            <div className="episode-details">
              <p className="episode-title">
                Episode {episode.episodeNumber}: {episode.title}
              </p>
            </div>
          </div>

          {/* Audio controls: Play/pause button and seek bar */}
          <div className="audio-controls">
            <button onClick={handlePlayPause} className="play-pause-button">
              {isPlaying ? 'Pause' : 'Play'}
            </button>
            <input
              type="range"
              min="0"
              max={duration || 0} /* Prevent errors if duration is not yet available */
              value={currentTime}
              onChange={handleSeek}
              className="seek-bar"
            />
          </div>

          {/* Display current time and total duration of audio */}
          <div className="time-info">
            {formatTime(currentTime)} / {formatTime(duration)}
          </div>

          {/* Hidden audio element with source file, tracks playback, stops when episode ends */}
          <audio
            ref={audioRef}
            src={episode.file || episode.audioUrl} /* Supports multiple source formats */
            onEnded={() => setIsPlaying(false)} /* Stop playback when audio ends */
          />
        </>
      ) : (
        // Placeholder display when no episode is selected
        <div className="no-episode">
          <FaMusic size={40} color="#999" />
          <h2>No Episode Selected</h2>
          <p>Select an episode to start listening.</p>
        </div>
      )}
    </div>
  );
};

export default AudioPlayer;

