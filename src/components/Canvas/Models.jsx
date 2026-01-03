import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { MeshDistortMaterial, Sphere, Box, Torus, Octahedron } from '@react-three/drei';
import * as THREE from 'three';
import { use3DRotation, use3DHover } from '../../hooks/use3DAnimation';

/**
 * Animated 3D Sphere with distortion
 */
export const AnimatedSphere = ({ position = [0, 0, 0], color = '#0ea5e9', ...props }) => {
  const meshRef = use3DRotation({ speed: 0.5, axis: 'all' });

  return (
    <Sphere ref={meshRef} position={position} args={[1, 64, 64]} {...props}>
      <MeshDistortMaterial
        color={color}
        attach="material"
        distort={0.3}
        speed={2}
        roughness={0.2}
        metalness={0.8}
      />
    </Sphere>
  );
};

/**
 * Rotating Cube with hover effect
 */
export const AnimatedCube = ({ position = [0, 0, 0], color = '#0ea5e9', ...props }) => {
  const { meshRef, handlePointerOver, handlePointerOut } = use3DHover({ scale: 1.3 });

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.5;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.7;
    }
  });

  return (
    <Box
      ref={meshRef}
      position={position}
      args={[1, 1, 1]}
      onPointerOver={handlePointerOver}
      onPointerOut={handlePointerOut}
      {...props}
    >
      <meshStandardMaterial color={color} metalness={0.6} roughness={0.3} />
    </Box>
  );
};

/**
 * Animated Torus
 */
export const AnimatedTorus = ({ position = [0, 0, 0], color = '#38bdf8', ...props }) => {
  const meshRef = use3DRotation({ speed: 1, axis: 'all' });

  return (
    <Torus ref={meshRef} position={position} args={[1, 0.4, 16, 100]} {...props}>
      <meshStandardMaterial color={color} metalness={0.8} roughness={0.2} />
    </Torus>
  );
};

/**
 * Floating Octahedron
 */
export const FloatingOctahedron = ({ position = [0, 0, 0], color = '#7dd3fc', ...props }) => {
  const meshRef = useRef();

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime) * 0.3;
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.4;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.6;
    }
  });

  return (
    <Octahedron ref={meshRef} position={position} args={[1, 0]} {...props}>
      <meshStandardMaterial color={color} metalness={0.7} roughness={0.3} wireframe />
    </Octahedron>
  );
};

/**
 * Particle System
 */
export const Particles = ({ count = 100, ...props }) => {
  const particlesRef = useRef();

  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);

  for (let i = 0; i < count; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 10;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 10;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 10;

    colors[i * 3] = Math.random();
    colors[i * 3 + 1] = Math.random();
    colors[i * 3 + 2] = Math.random();
  }

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.elapsedTime * 0.05;
    }
  });

  return (
    <points ref={particlesRef} {...props}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={colors.length / 3}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={0.05} vertexColors transparent opacity={0.8} />
    </points>
  );
};

/**
 * Morphing Geometry
 */
export const MorphingGeometry = ({ position = [0, 0, 0], ...props }) => {
  const meshRef = useRef();
  const targetGeometry = useRef(0);

  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.elapsedTime;
      meshRef.current.rotation.x = time * 0.3;
      meshRef.current.rotation.y = time * 0.5;
      
      // Morph effect
      const scale = 1 + Math.sin(time) * 0.2;
      meshRef.current.scale.set(scale, scale, scale);
    }
  });

  return (
    <mesh ref={meshRef} position={position} {...props}>
      <icosahedronGeometry args={[1, 1]} />
      <meshStandardMaterial
        color="#0ea5e9"
        wireframe
        transparent
        opacity={0.8}
      />
    </mesh>
  );
};

/**
 * Glowing Sphere
 */
export const GlowingSphere = ({ position = [0, 0, 0], color = '#0ea5e9', ...props }) => {
  const meshRef = useRef();
  const glowRef = useRef();

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.5;
    }
    if (glowRef.current) {
      const pulse = Math.sin(state.clock.elapsedTime * 2) * 0.1 + 1;
      glowRef.current.scale.set(pulse, pulse, pulse);
    }
  });

  return (
    <group position={position}>
      {/* Main sphere */}
      <Sphere ref={meshRef} args={[1, 32, 32]} {...props}>
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.5} />
      </Sphere>
      
      {/* Glow effect */}
      <Sphere ref={glowRef} args={[1.2, 32, 32]}>
        <meshBasicMaterial color={color} transparent opacity={0.2} />
      </Sphere>
    </group>
  );
};

export default {
  AnimatedSphere,
  AnimatedCube,
  AnimatedTorus,
  FloatingOctahedron,
  Particles,
  MorphingGeometry,
  GlowingSphere,
};
