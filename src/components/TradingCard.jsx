import { useRef } from 'react';
import { motion } from 'framer-motion';

const TradingCard = ({ photo, onOpen }) => {
  const cardRef = useRef(null);
  const foilRef = useRef(null);

  const handleMouseMove = (e) => {
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    
    const rotateX = (y - 0.5) * -20;
    const rotateY = (x - 0.5) * 20;
    
    const inner = cardRef.current.querySelector('.trading-card-inner');
    if (inner) {
      inner.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    }
    
    if (foilRef.current) {
      foilRef.current.style.background = `linear-gradient(${135 + (x * 20)}deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.2) 50%, rgba(255,255,255,0) 100%)`;
      foilRef.current.style.backgroundPosition = `${x * 100}% ${y * 100}%`;
    }
  };

  const handleMouseLeave = () => {
    const inner = cardRef.current.querySelector('.trading-card-inner');
    if (inner) {
      inner.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
    }
  };

  return (
    <motion.div
      ref={cardRef}
      className="trading-card-container"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={() => onOpen(photo)}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      style={{
        perspective: '1000px',
      }}
    >
      <div
        className="trading-card-inner group"
        style={{ aspectRatio: '2/3', transition: 'transform 0.1s ease-out' }}
      >
        <div className="card-glint"></div>
        <div className="card-grain"></div>
        <div className="card-date-stamp">APRIL 2025 - MISSION 3.0</div>

        <img src={photo.src} alt={photo.label} className="card-image" loading="lazy" />

        <div
          ref={foilRef}
          className="holographic-foil"
          style={{
            mixBlendMode: 'color-dodge'
          }}
        />

        <div className="card-power-stats opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="stat-line">INNOVATION [||||||||--] 85%</div>
          <div className="stat-line">TEAM SYNERGY [||||||||||] MAX</div>
        </div>
      </div>
    </motion.div>
  );
};

export default TradingCard;
