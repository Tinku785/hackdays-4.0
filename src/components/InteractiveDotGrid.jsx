import { useEffect, useRef } from 'react';

const InteractiveDotGrid = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    let dots = [];
    const spacing = 32; // Optimized density for better performance

    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    let mouse = { x: -1000, y: -1000 };
    window.addEventListener('mousemove', handleMouseMove);

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initDots();
    };

    const themeColors = ['#FF3131', '#FFDE59', '#004AAD'];
    const initDots = () => {
      dots = [];
      const cols = Math.floor(canvas.width / spacing) + 1;
      const rows = Math.floor(canvas.height / spacing) + 1;

      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const x = i * spacing;
          const y = j * spacing;
          const themeColor = themeColors[Math.floor(Math.random() * themeColors.length)];
          dots.push({ x, y, baseX: x, baseY: y, themeColor });
        }
      }
    };

    window.addEventListener('resize', resize);
    resize();

    let time = 0;
    const render = () => {
      time += 0.15;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const isVillain = document.body.classList.contains('villain-mode');

      dots.forEach((dot) => {
        let dx = mouse.x - dot.baseX;
        let dy = mouse.y - dot.baseY;
        let dist = Math.sqrt(dx * dx + dy * dy);

        let radius = 1.2;
        let fill = isVillain ? 'rgba(57, 255, 20, 0.3)' : 'rgba(0, 0, 0, 0.4)';

        if (dist < 150) {
          const force = (150 - dist) / 150;
          const wavePhase = (dist * 0.05) - time;
          const ripple = Math.cos(wavePhase);

          dot.x = dot.baseX - (dx * force * 0.4 * ripple);
          dot.y = dot.baseY - (dy * force * 0.4 * ripple);
          radius = 1.2 + Math.abs(ripple) * force * 3.5;
          fill = isVillain ? '#39ff14' : dot.themeColor;
        } else {
          dot.x += (dot.baseX - dot.x) * 0.15;
          dot.y += (dot.baseY - dot.y) * 0.15;
        }

        ctx.beginPath();
        ctx.arc(dot.x, dot.y, radius, 0, Math.PI * 2);
        ctx.fillStyle = fill;
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    };
    render();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: -1, pointerEvents: 'none' }} />;
};

export default InteractiveDotGrid;
