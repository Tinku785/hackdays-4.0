import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bug } from 'lucide-react';

const BugHunter = () => {
  const [bugs, setBugs] = useState([]);
  const [score, setScore] = useState(0);

  useEffect(() => {
    const spawnTimer = setInterval(() => {
      if (bugs.length < 5) {
        setBugs(prev => [...prev.slice(-4), {
          id: Math.random(),
          x: 10 + Math.random() * 80,
          y: 20 + Math.random() * 60,
          rotation: Math.random() * 360
        }]);
      }
    }, 1200);
    return () => clearInterval(spawnTimer);
  }, [bugs]);

  const emergencyAudioRef = useRef(null);
  const winAudioRef = useRef(null);

  useEffect(() => {
    return () => {
      if (emergencyAudioRef.current) {
        emergencyAudioRef.current.pause();
        emergencyAudioRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (score === 1) {
      if (!emergencyAudioRef.current) {
        emergencyAudioRef.current = new Audio("/emergency.mp3");
        emergencyAudioRef.current.loop = true;
      }
      emergencyAudioRef.current.play().catch(() => { });
    }

    if (score >= 10) {
      if (emergencyAudioRef.current) {
        emergencyAudioRef.current.pause();
      }
      if (!winAudioRef.current) {
        winAudioRef.current = new Audio("/win.mp3");
      }
      winAudioRef.current.play().catch(() => { });
    }

    if (score === 0 && emergencyAudioRef.current) {
      emergencyAudioRef.current.pause();
      emergencyAudioRef.current.currentTime = 0;
    }
  }, [score]);

  const onThwip = (e, id) => {
    e.stopPropagation();
    setScore(s => s + 1);
    setBugs(prev => prev.filter(b => b.id !== id));
    if (!window._killSfx) window._killSfx = new Audio("/kill_sfx.mp3");
    window._killSfx.currentTime = 0;
    window._killSfx.play().catch(() => { });
  };

  const isCleared = score >= 10;

  return (
    <div className={`bug-hunter-container ${score > 0 && !isCleared ? 'emergency-strobe' : ''} ${isCleared ? 'system-secured' : ''}`}>
      {isCleared ? (
        <div className="victory-overlay">
          <div className="victory-burst">
            <h2>SYSTEM SECURED!</h2>
            <p>YOU'RE A TRUE HERO! THE HACKATHON IS SAFE.</p>
            <div className="onomatopoeia-win">THWIP!</div>
          </div>
          <button className="comic-button yellow btn-small" onClick={() => setScore(0)}>SCAN FOR MORE BUGS?</button>
        </div>
      ) : (
        <>
          <div className="game-hud">
            <div className="hud-badge-tag">{score > 5 ? '⚠️ !!! CRITICAL EMERGENCY !!! ⚠️' : 'THREAT_LEVEL: DETECTED'}</div>
            <div className="hud-score-tag">BUGS_CAPTURED: {score}/10</div>
          </div>
          <div className="game-area">
            <AnimatePresence>
              {bugs.map(bug => (
                <motion.div
                  key={bug.id}
                  className="bug-target"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1, rotate: bug.rotation }}
                  exit={{ scale: 1.5, opacity: 0 }}
                  style={{ left: `${bug.x}%`, top: `${bug.y}%` }}
                  onMouseDown={(e) => onThwip(e, bug.id)}
                >
                  <Bug size={32} strokeWidth={3} />
                  <div className="spider-sense-ring"></div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
          <div className="game-footer-text">
            {score > 0 ? 'DANGER!!! SYSTEM BREACH!!! KILL THEM ALL!!!' : 'HINT: TAP THE BUGS TO "THWIP" THEM!'}
          </div>
        </>
      )}
    </div>
  );
};

export default BugHunter;
