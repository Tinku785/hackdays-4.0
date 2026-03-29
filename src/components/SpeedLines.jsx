import React from 'react';

const SpeedLines = ({ scrollY }) => {
  const isMoving = scrollY > 50 && scrollY < 1200;
  if (!isMoving) return null;

  const opacity = Math.min((scrollY - 50) / 200, 1) * Math.max(0, (1200 - scrollY) / 400);

  return (
    <div className="speed-lines-container" style={{ opacity }}>
      {[...Array(20)].map((_, i) => (
        <div key={i} className="speed-line" style={{
          top: `${Math.random() * 100}%`,
          left: `${Math.random() * 100}%`,
          width: `${100 + Math.random() * 300}px`,
          transform: `rotate(${-30 + Math.random() * 10}deg)`,
          animationDelay: `${Math.random() * 0.5}s`
        }} />
      ))}
    </div>
  );
};

export default SpeedLines;
