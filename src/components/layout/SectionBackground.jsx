import { Stars } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';

/**
 * Reusable section background component with animated particles
 * Provides consistent styling across all sections
 */
const SectionBackground = ({ 
  children, 
  variant = 'default',
  className = '',
  showStars = false,
  showParticles = true,
  id = ''
}) => {
  return (
    <section 
      id={id}
      className={`relative min-h-screen overflow-hidden bg-dark-300 ${className}`}
    >
      {/* Animated particles background */}
      {showParticles && (
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          {[...Array(40)].map((_, i) => {
            const size = 1 + Math.random() * 3;
            const left = Math.random() * 100;
            const top = Math.random() * 100;
            const delay = Math.random() * 10;
            const duration = 15 + Math.random() * 25;
            const opacity = 0.15 + Math.random() * 0.25;
            
            return (
              <div
                key={i}
                className="absolute bg-gray-500 rounded-full"
                style={{
                  left: `${left}%`,
                  top: `${top}%`,
                  width: `${size}px`,
                  height: `${size}px`,
                  opacity: opacity,
                  animation: `float-particle ${duration}s ease-in-out ${delay}s infinite`,
                }}
              />
            );
          })}
        </div>
      )}

      {/* Optional 3D background elements */}
      {showStars && (
        <div className="absolute inset-0 z-0">
          <Canvas dpr={[1, 1.5]}>
            <Stars
              radius={50}
              depth={30}
              count={1000}
              factor={2}
              saturation={0}
              fade
              speed={0.5}
            />
          </Canvas>
        </div>
      )}
      
      {/* Vignette overlay matching hero */}
      <div className="absolute inset-0 z-10 pointer-events-none" style={{
        background: variant === 'light' 
          ? 'radial-gradient(ellipse 70% 60% at center, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.05) 70%, rgba(0, 0, 0, 0.3) 100%)'
          : 'radial-gradient(ellipse 70% 60% at center, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.1) 70%, rgba(0, 0, 0, 0.4) 100%)',
      }} />
      
      {/* Content layer */}
      <div className="relative z-20">
        {children}
      </div>
    </section>
  );
};

export default SectionBackground;
