import React from 'react';

const GamePlay: React.FC = () => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <iframe
        width="560"
        height="315"
        src="https://www.youtube.com/embed/L9-61i_hLII?start=15"
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default GamePlay;
