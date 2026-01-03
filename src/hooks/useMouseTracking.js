import { useEffect, useRef, useState } from 'react';
import { throttle } from '../utils/helpers';

/**
 * Custom hook for smooth mouse tracking
 * @returns {Object} { mousePosition, normalizedMouse }
 */
export const useMouseTracking = () => {
  const mousePosition = useRef({ x: 0, y: 0 });
  const normalizedMouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = throttle((event) => {
      mousePosition.current = {
        x: event.clientX,
        y: event.clientY,
      };

      // Normalize to -1 to 1 range
      normalizedMouse.current = {
        x: (event.clientX / window.innerWidth) * 2 - 1,
        y: -(event.clientY / window.innerHeight) * 2 + 1,
      };
    }, 16); // ~60fps

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return { mousePosition, normalizedMouse };
};

/**
 * Custom hook for cursor trail effect
 */
export const useCursorTrail = () => {
  const [trail, setTrail] = useState([]);
  const trailRef = useRef([]);
  const maxTrailLength = 10;

  useEffect(() => {
    const handleMouseMove = (e) => {
      const newPoint = { x: e.clientX, y: e.clientY, id: Date.now() };
      trailRef.current = [newPoint, ...trailRef.current.slice(0, maxTrailLength - 1)];
      setTrail([...trailRef.current]);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return trail;
};

/**
 * Custom hook for magnetic cursor effect
 */
export const useMagneticCursor = (strength = 0.3) => {
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const targetPos = useRef({ x: 0, y: 0 });
  const currentPos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      targetPos.current = { x: e.clientX, y: e.clientY };
    };

    const animate = () => {
      // Smooth interpolation
      currentPos.current.x += (targetPos.current.x - currentPos.current.x) * strength;
      currentPos.current.y += (targetPos.current.y - currentPos.current.y) * strength;

      setCursorPos({ ...currentPos.current });
      requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', handleMouseMove);
    animate();

    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [strength]);

  return cursorPos;
};

export default useMouseTracking;
