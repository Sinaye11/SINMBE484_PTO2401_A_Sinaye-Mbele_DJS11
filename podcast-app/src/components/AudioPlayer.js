import React from 'react';

const AudioPlayer = ({ src, title }) => {
  return (
    <div className="audio-player">
      <h3>{title}</h3>
      <audio controls>
        <source src={src} type="audio/mp3" />
        Your browser does not support the audio element.
      </audio>
    </div>
  );
};

export default AudioPlayer;
