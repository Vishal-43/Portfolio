import { Environment, Stars, Sparkles, ContactShadows } from '@react-three/drei';
import { EffectComposer, Bloom, ChromaticAberration } from '@react-three/postprocessing';
import { BlendFunction } from 'postprocessing';

/**
 * Lighting setup for 3D scenes
 */
export const Lights = () => {
  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} castShadow />
      <pointLight position={[-10, -10, -5]} intensity={0.5} color="#0ea5e9" />
      <spotLight
        position={[0, 10, 0]}
        angle={0.3}
        penumbra={1}
        intensity={1}
        castShadow
      />
    </>
  );
};

/**
 * Starfield background
 */
export const StarField = ({ count = 5000 }) => {
  return (
    <Stars
      radius={100}
      depth={50}
      count={count}
      factor={4}
      saturation={0}
      fade
      speed={1}
    />
  );
};

/**
 * Sparkle particles effect
 */
export const SparkleEffect = ({ count = 50, ...props }) => {
  return (
    <Sparkles
      count={count}
      scale={10}
      size={2}
      speed={0.4}
      opacity={0.6}
      color="#0ea5e9"
      {...props}
    />
  );
};

/**
 * Environment preset for realistic reflections
 */
export const SceneEnvironment = ({ preset = 'night' }) => {
  return <Environment preset={preset} />;
};

/**
 * Contact shadows for grounded objects
 */
export const GroundShadows = () => {
  return (
    <ContactShadows
      position={[0, -1.4, 0]}
      opacity={0.5}
      scale={10}
      blur={2.5}
      far={4}
    />
  );
};

/**
 * Post-processing effects (Bloom & Chromatic Aberration)
 */
export const PostProcessing = ({ 
  bloomIntensity = 0.5,
  bloomLuminanceThreshold = 0.9,
  chromaticAberration = true 
}) => {
  return (
    <EffectComposer>
      <Bloom
        intensity={bloomIntensity}
        luminanceThreshold={bloomLuminanceThreshold}
        luminanceSmoothing={0.9}
        blendFunction={BlendFunction.SCREEN}
      />
      {chromaticAberration && (
        <ChromaticAberration
          blendFunction={BlendFunction.NORMAL}
          offset={[0.002, 0.002]}
        />
      )}
    </EffectComposer>
  );
};

/**
 * Complete effects package
 */
export const SceneEffects = ({ 
  lights = true,
  stars = true,
  sparkles = false,
  environment = true,
  shadows = false,
  postProcessing = false 
}) => {
  return (
    <>
      {lights && <Lights />}
      {stars && <StarField />}
      {sparkles && <SparkleEffect />}
      {environment && <SceneEnvironment />}
      {shadows && <GroundShadows />}
      {postProcessing && <PostProcessing />}
    </>
  );
};

export default {
  Lights,
  StarField,
  SparkleEffect,
  SceneEnvironment,
  GroundShadows,
  PostProcessing,
  SceneEffects,
};
