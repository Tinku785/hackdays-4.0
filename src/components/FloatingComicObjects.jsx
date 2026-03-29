import { useRef, useMemo } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame } from '@react-three/fiber';

const ComicStarfield = () => {
  const count = 1500;

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 50;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 50;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 50;
    }
    return pos;
  }, [count]);

  const colors = useMemo(() => {
    const cols = new Float32Array(count * 3);
    const marvelColors = [
      new THREE.Color('#e62429'),
      new THREE.Color('#fbcf00'),
      new THREE.Color('#0047b3'),
      new THREE.Color('#ffffff'),
    ];
    for (let i = 0; i < count; i++) {
      const color = marvelColors[Math.floor(Math.random() * marvelColors.length)];
      cols[i * 3] = color.r;
      cols[i * 3 + 1] = color.g;
      cols[i * 3 + 2] = color.b;
    }
    return cols;
  }, [count]);

  const pointsRef = useRef();
  const lastScrollY = useRef(0);

  useFrame((state, delta) => {
    if (pointsRef.current) {
      const currentScrollY = window.scrollY;
      const scrollDelta = currentScrollY - lastScrollY.current;
      lastScrollY.current = currentScrollY;

      const posArray = pointsRef.current.geometry.attributes.position.array;
      const speed = delta * 1.5 + scrollDelta * 0.08;

      for (let i = 0; i < count; i++) {
        posArray[i * 3 + 2] += speed;
        if (posArray[i * 3 + 2] > 15) {
          posArray[i * 3 + 2] -= 50;
        } else if (posArray[i * 3 + 2] < -35) {
          posArray[i * 3 + 2] += 50;
        }
      }
      pointsRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
        <bufferAttribute attach="attributes-color" count={count} array={colors} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.2} vertexColors={true} transparent opacity={0.8} sizeAttenuation={true} depthWrite={false} />
    </points>
  );
};

const FloatingComicObjects = () => {
  return (
    <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 4 }}>
      <Canvas camera={{ position: [0, 0, 10], fov: 50 }}>
        <ambientLight intensity={0.6} />
        <ComicStarfield />
      </Canvas>
    </div>
  );
};

export default FloatingComicObjects;
