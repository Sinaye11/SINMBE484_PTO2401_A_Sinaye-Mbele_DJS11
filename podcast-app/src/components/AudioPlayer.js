// src/components/AudioPlayer.js
import React, { useEffect, useRef, useState } from 'react';
import { FaMusic } from 'react-icons/fa'; // Importing an icon for a better placeholder
import './AudioPlayer.css';

const AudioPlayer = ({ episode, isPlaying, setIsPlaying }) => {
  const audioRef = useRef(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  // Play or pause the audio when isPlaying or episode changes
  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying && episode) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, episode]);

  // Update currentTime and duration
  useEffect(() => {
    const audio = audioRef.current;

    const updateTime = () => {
      setCurrentTime(audio.currentTime);
    };

    const updateDuration = () => {
      setDuration(audio.duration);
    };

    if (audio) {
      audio.addEventListener('timeupdate', updateTime);
      audio.addEventListener('loadedmetadata', updateDuration);
    }

    return () => {
      if (audio) {
        audio.removeEventListener('timeupdate', updateTime);
        audio.removeEventListener('loadedmetadata', updateDuration);
      }
    };
  }, [episode]);

  // Handle play/pause button click
  const handlePlayPause = () => {
    if (episode) {
      setIsPlaying(!isPlaying);
    }
  };

  // Handle seek bar change
  const handleSeek = (e) => {
    const newTime = e.target.value;
    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  // Format time in mm:ss
  const formatTime = (time) => {
    if (isNaN(time)) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60)
      .toString()
      .padStart(2, '0');
    return `${minutes}:${seconds}`;
  };

  // Adjust the className for conditional styling
  const playerClassName = episode ? 'audio-player active' : 'audio-player inactive';

  return (
    <div className={playerClassName}>
      {episode ? (
        <>
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
          <div className="audio-controls">
            <button onClick={handlePlayPause} className="play-pause-button">
              {isPlaying ? 'Pause' : 'Play'}
            </button>
            <input
              type="range"
              min="0"
              max={duration || 0}
              value={currentTime}
              onChange={handleSeek}
              className="seek-bar"
            />
          </div>
          <div className="time-info">
            {formatTime(currentTime)} / {formatTime(duration)}
          </div>
          <audio
            ref={audioRef}
            src={episode.file || episode.audioUrl}
            onEnded={() => setIsPlaying(false)}
          />
        </>
      ) : (
        <div className="no-episode">
          <FaMusic size={60} color="#999" />
          <h2>No Episode Selected</h2>
          <p>Select an episode to start listening.</p>
        </div>
      )}
    </div>
  );
};

export default AudioPlayer;
