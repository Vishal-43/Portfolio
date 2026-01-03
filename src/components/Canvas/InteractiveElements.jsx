import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/**
 * Interactive Particle System Component
 */
export const InteractiveParticles = ({ count = 1000, mousePosition, ...props }) => {
  const particlesRef = useRef();
  const velocitiesRef = useRef([]);
  const originalPositions = useRef([]);

  // Generate particle positions and velocities
  const { positions, colors } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const velocities = [];

    for (let i = 0; i < count; i++) {
      // Spread particles in a sphere
      const radius = 15 + Math.random() * 10;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI;

      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi);

      // Store original positions
      originalPositions.current.push(
        positions[i * 3],
        positions[i * 3 + 1],
        positions[i * 3 + 2]
      );

      // Gradient colors
      const gradient = i / count;
      colors[i * 3] = 0.1 + gradient * 0.5; // R
      colors[i * 3 + 1] = 0.5 + gradient * 0.3; // G
      colors[i * 3 + 2] = 0.9; // B

      velocities.push(
        (Math.random() - 0.5) * 0.02,
        (Math.random() - 0.5) * 0.02,
        (Math.random() - 0.5) * 0.02
      );
    }

    velocitiesRef.current = velocities;
    return { positions, colors };
  }, [count]);

  // Animation loop
  useFrame((state) => {
    if (!particlesRef.current) return;

    const positions = particlesRef.current.geometry.attributes.position.array;
    const time = state.clock.elapsedTime;

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;

      // Ambient floating animation
      positions[i3] = originalPositions.current[i3] + Math.sin(time + i * 0.1) * 0.5;
      positions[i3 + 1] = originalPositions.current[i3 + 1] + Math.cos(time + i * 0.15) * 0.5;
      positions[i3 + 2] = originalPositions.current[i3 + 2] + Math.sin(time + i * 0.2) * 0.3;

      // React to mouse position
      if (mousePosition) {
        const mouseX = mousePosition.x * 10;
        const mouseY = mousePosition.y * 10;

        const dx = positions[i3] - mouseX;
        const dy = positions[i3 + 1] - mouseY;
        const distance = Math.sqrt(dx * dx + dy * dy);

        // Repel particles from mouse
        if (distance < 5) {
          const force = (5 - distance) / 5;
          positions[i3] += dx * force * 0.1;
          positions[i3 + 1] += dy * force * 0.1;
        }
      }
    }

    particlesRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={particlesRef} {...props}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={count}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.1}
        vertexColors
        transparent
        opacity={0.8}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
};

/**
 * Orbiting Satellite Objects
 */
export const OrbitingObjects = ({ count = 5, mainPosition = [0, 0, 0], mousePosition }) => {
  const groupRef = useRef();

  useFrame((state) => {
    if (!groupRef.current) return;

    const time = state.clock.elapsedTime;
    groupRef.current.rotation.y = time * 0.2;

    // React to mouse
    if (mousePosition) {
      groupRef.current.rotation.x = mousePosition.y * 0.3;
      groupRef.current.rotation.z = mousePosition.x * 0.2;
    }
  });

  return (
    <group ref={groupRef} position={mainPosition}>
      {Array.from({ length: count }).map((_, i) => {
        const angle = (i / count) * Math.PI * 2;
        const radius = 3;
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;

        return (
          <mesh key={i} position={[x, 0, z]}>
            <octahedronGeometry args={[0.3, 0]} />
            <meshStandardMaterial
              color={`hsl(${(i / count) * 360}, 70%, 60%)`}
              emissive={`hsl(${(i / count) * 360}, 70%, 40%)`}
              emissiveIntensity={0.5}
              wireframe
            />
          </mesh>
        );
      })}
    </group>
  );
};

/**
 * Morphing Hero Object
 */
export const MorphingHeroObject = ({ mousePosition, scrollProgress = 0 }) => {
  const meshRef = useRef();
  const materialRef = useRef();

  useFrame((state) => {
    if (!meshRef.current) return;

    const time = state.clock.elapsedTime;

    // Smooth rotation
    meshRef.current.rotation.x = time * 0.2 + (mousePosition?.y || 0) * 0.5;
    meshRef.current.rotation.y = time * 0.3 + (mousePosition?.x || 0) * 0.5;

    // Pulsing scale
    const pulse = 1 + Math.sin(time * 2) * 0.1;
    meshRef.current.scale.set(pulse, pulse, pulse);

    // Morph based on scroll
    const morphScale = 1 + scrollProgress * 0.5;
    meshRef.current.scale.multiplyScalar(morphScale);

    // Color shift
    if (materialRef.current) {
      const hue = (time * 20 + scrollProgress * 360) % 360;
      materialRef.current.color.setHSL(hue / 360, 0.7, 0.5);
      materialRef.current.emissive.setHSL(hue / 360, 0.7, 0.3);
    }
  });

  return (
    <mesh ref={meshRef}>
      <icosahedronGeometry args={[2, 2]} />
      <meshStandardMaterial
        ref={materialRef}
        color="#0ea5e9"
        emissive="#0ea5e9"
        emissiveIntensity={0.5}
        metalness={0.8}
        roughness={0.2}
        wireframe
      />
    </mesh>
  );
};

/**
 * Dynamic Point Lights
 */
export const DynamicLights = ({ mousePosition }) => {
  const light1Ref = useRef();
  const light2Ref = useRef();

  useFrame((state) => {
    const time = state.clock.elapsedTime;

    if (light1Ref.current) {
      light1Ref.current.position.x = Math.sin(time) * 5 + (mousePosition?.x || 0) * 3;
      light1Ref.current.position.y = Math.cos(time) * 5 + (mousePosition?.y || 0) * 3;
      light1Ref.current.intensity = 1 + Math.sin(time * 2) * 0.5;
    }

    if (light2Ref.current) {
      light2Ref.current.position.x = Math.cos(time * 1.5) * 5;
      light2Ref.current.position.z = Math.sin(time * 1.5) * 5;
    }
  });

  return (
    <>
      <pointLight ref={light1Ref} color="#0ea5e9" intensity={1} distance={20} />
      <pointLight ref={light2Ref} color="#7dd3fc" intensity={0.8} distance={15} position={[0, 5, 0]} />
    </>
  );
};

export default InteractiveParticles;
