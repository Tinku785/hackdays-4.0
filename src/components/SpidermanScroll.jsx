import { useState, useEffect } from 'react';

const SpidermanScroll = ({ isVillainMode }) => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [spideySrc, setSpideySrc] = useState('');

  useEffect(() => {
    let rafId;
    const handleScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;
        const scrolled = window.scrollY;
        const maxScroll = documentHeight - windowHeight;
        const progress = Math.min(Math.max(scrolled / (maxScroll || 1), 0), 1);
        setScrollProgress(progress);
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    const cacheKey = isVillainMode ? 'villain' : 'hero';
    if (window._spideyCache?.[cacheKey]) {
      setSpideySrc(window._spideyCache[cacheKey]);
    } else {
      const img = new Image();
      img.src = isVillainMode ? '/villain_venom.png' : '/spiderman_falldown.png';
      img.crossOrigin = "Anonymous";
      img.onload = () => {
        const cvs = document.createElement('canvas');
        cvs.width = img.width;
        cvs.height = img.height;
        const ctx = cvs.getContext('2d');
        ctx.drawImage(img, 0, 0);
        const imgData = ctx.getImageData(0, 0, cvs.width, cvs.height);
        const data = imgData.data;
        const bgR = data[0], bgG = data[1], bgB = data[2];

        for (let i = 0; i < data.length; i += 4) {
          if (Math.abs(data[i] - bgR) < 40 && Math.abs(data[i + 1] - bgG) < 40 && Math.abs(data[i + 2] - bgB) < 40) {
            data[i + 3] = 0;
          }
        }
        ctx.putImageData(imgData, 0, 0);
        const dataUrl = cvs.toDataURL();
        if (!window._spideyCache) window._spideyCache = {};
        window._spideyCache[cacheKey] = dataUrl;
        setSpideySrc(dataUrl);
      };
    }

    return () => {
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(rafId);
    };
  }, [isVillainMode]);

    const isMobile = window.innerWidth < 768;
    
    return (
      <div style={{
        position: 'fixed',
        top: 0,
        left: isMobile ? '10px' : '30px',
        zIndex: 9999,
        pointerEvents: 'none',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}>
        <div style={{
          width: '3px',
          height: `${scrollProgress * 85}vh`,
          background: 'linear-gradient(to bottom, rgba(255,255,255,0.4), #fff)',
          boxShadow: '0 0 5px rgba(255,255,255,0.8), 2px 2px 0 #000',
          transition: 'height 0.2s ease-out'
        }}></div>
  
        <img
          src={spideySrc || (isVillainMode ? "/villain_venom.png" : "/spiderman_falldown.png")}
          alt="Animated Character Hanging"
          style={{
            width: isMobile ? '60px' : '120px',
            height: 'auto',
            marginTop: '-15px',
            marginLeft: isVillainMode ? '-35px' : '-15px',
            filter: isVillainMode ? 'drop-shadow(0 0 10px #39ff14)' : 'drop-shadow(2px 5px 5px rgba(0,0,0,0.5))',
            transformOrigin: isVillainMode ? '70% 5%' : '60% 5%',
            transform: `translateY(${scrollProgress * 15}px) rotate(${Math.sin(scrollProgress * 30) * 15}deg)`,
            transition: 'transform 0.1s ease-out'
          }}
        />
      </div>
    );

};

export default SpidermanScroll;
