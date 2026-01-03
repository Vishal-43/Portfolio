import { useEffect, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/**
 * Custom hook for 3D rotation animation
 * @param {Object} options - Animation options
 * @returns {Object} - Mesh ref
 */
export const use3DRotation = (options = {}) => {
  const meshRef = useRef();
  const { speed = 1, axis = 'y', autoRotate = true } = options;

  useFrame((state, delta) => {
    if (meshRef.current && autoRotate) {
      if (axis === 'x') meshRef.current.rotation.x += delta * speed;
      if (axis === 'y') meshRef.current.rotation.y += delta * speed;
      if (axis === 'z') meshRef.current.rotation.z += delta * speed;
      if (axis === 'all') {
        meshRef.current.rotation.x += delta * speed * 0.5;
        meshRef.current.rotation.y += delta * speed;
        meshRef.current.rotation.z += delta * speed * 0.3;
      }
    }
  });

  return meshRef;
};

/**
 * Custom hook for 3D float animation
 * @param {Object} options - Float options
 * @returns {Object} - Mesh ref
 */
export const use3DFloat = (options = {}) => {
  const meshRef = useRef();
  const { speed = 1, intensity = 0.5, floatIntensity = 1 } = options;

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.position.y = 
        Math.sin(state.clock.elapsedTime * speed) * intensity * floatIntensity;
    }
  });

  return meshRef;
};

/**
 * Custom hook for mouse-interactive 3D animation
 * @returns {Object} - { meshRef, mousePosition }
 */
export const use3DMouseInteraction = () => {
  const meshRef = useRef();
  const mousePosition = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (event) => {
      mousePosition.current = {
        x: (event.clientX / window.innerWidth) * 2 - 1,
        y: -(event.clientY / window.innerHeight) * 2 + 1,
      };
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y = mousePosition.current.x * 0.5;
      meshRef.current.rotation.x = mousePosition.current.y * 0.5;
    }
  });

  return { meshRef, mousePosition };
};

/**
 * Custom hook for 3D hover effect
 * @param {Object} options - Hover options
 * @returns {Object} - { meshRef, isHovered, handlePointerOver, handlePointerOut }
 */
export const use3DHover = (options = {}) => {
  const meshRef = useRef();
  const { scale = 1.2, duration = 0.3 } = options;
  const targetScale = useRef(1);
  const isHovered = useRef(false);

  const handlePointerOver = () => {
    isHovered.current = true;
    targetScale.current = scale;
  };

  const handlePointerOut = () => {
    isHovered.current = false;
    targetScale.current = 1;
  };

  useFrame((state, delta) => {
    if (meshRef.current) {
      // Smooth scale transition
      meshRef.current.scale.x = THREE.MathUtils.lerp(
        meshRef.current.scale.x,
        targetScale.current,
        delta / duration
      );
      meshRef.current.scale.y = meshRef.current.scale.x;
      meshRef.current.scale.z = meshRef.current.scale.x;
    }
  });

  return {
    meshRef,
    isHovered: isHovered.current,
    handlePointerOver,
    handlePointerOut,
  };
};

/**
 * Custom hook for wave animation on mesh
 */
export const use3DWave = (options = {}) => {
  const meshRef = useRef();
  const { speed = 1, amplitude = 0.5 } = options;

  useFrame((state) => {
    if (meshRef.current && meshRef.current.geometry) {
      const time = state.clock.getElapsedTime() * speed;
      const positionAttribute = meshRef.current.geometry.attributes.position;

      for (let i = 0; i < positionAttribute.count; i++) {
        const x = positionAttribute.getX(i);
        const y = positionAttribute.getY(i);
        const wave = Math.sin(x * 2 + time) * Math.cos(y * 2 + time) * amplitude;
        positionAttribute.setZ(i, wave);
      }

      positionAttribute.needsUpdate = true;
    }
  });

  return meshRef;
};

/**
 * Custom hook for particle system
 */
export const use3DParticles = (count = 100, options = {}) => {
  const particlesRef = useRef();
  const { speed = 1, range = 5 } = options;

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.elapsedTime * speed * 0.05;
      
      const positions = particlesRef.current.geometry.attributes.position.array;
      for (let i = 0; i < positions.length; i += 3) {
        positions[i + 1] = Math.sin(state.clock.elapsedTime * speed + positions[i]) * 0.5;
      }
      particlesRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return particlesRef;
};

export default use3DRotation;
