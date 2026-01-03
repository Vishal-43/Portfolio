import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import Loader from '../Loader';

/**
 * Main 3D Scene wrapper component
 */
const Scene = ({ children, camera = { position: [0, 0, 5], fov: 75 }, controls = true, ...props }) => {
  return (
    <Canvas
      className="w-full h-full"
      dpr={[1, 2]}
      {...props}
    >
      <PerspectiveCamera makeDefault position={camera.position} fov={camera.fov} />
      
      <Suspense fallback={null}>
        {children}
      </Suspense>

      {controls && <OrbitControls enableZoom={false} enablePan={false} />}
    </Canvas>
  );
};

export default Scene;
