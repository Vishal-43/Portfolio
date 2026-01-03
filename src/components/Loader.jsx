import { Html } from '@react-three/drei';
import { useState, useEffect } from 'react';

/**
 * Loading component for 3D scenes
 */
const Loader = () => {
  return (
    <Html center>
      <div className="flex flex-col items-center justify-center">
        <div className="w-16 h-16 border-4 border-gray-600 border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-4 text-white text-sm font-medium">Loading 3D Scene...</p>
      </div>
    </Html>
  );
};

/**
 * Full Page Particle Constellation Loading Screen
 */
export const WaterDropLoader = ({ onLoadingComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Simulate loading progress with smoother increments
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsVisible(false);
            if (onLoadingComplete) onLoadingComplete();
          }, 800);
          return 100;
        }
        // Smoother progression
        return Math.min(prev + Math.random() * 8 + 2, 100);
      });
    }, 150);

    return () => clearInterval(interval);
  }, [onLoadingComplete]);

  if (!isVisible) return null;

  // Generate particle positions for constellation
  const particles = [
    { x: 50, y: 30, size: 4, delay: 0 },
    { x: 30, y: 45, size: 3, delay: 0.1 },
    { x: 70, y: 45, size: 3, delay: 0.2 },
    { x: 20, y: 60, size: 2, delay: 0.3 },
    { x: 50, y: 50, size: 6, delay: 0 }, // center
    { x: 80, y: 60, size: 2, delay: 0.4 },
    { x: 35, y: 70, size: 3, delay: 0.5 },
    { x: 65, y: 70, size: 3, delay: 0.6 },
    { x: 50, y: 80, size: 4, delay: 0.7 },
  ];

  const connections = [
    [0, 1], [0, 2], [1, 4], [2, 4], [4, 3], [4, 5], [3, 6], [5, 7], [6, 8], [7, 8]
  ];

  return (
    <div className={`fixed inset-0 z-[9999] bg-gradient-to-br from-black via-gray-950 to-black flex items-center justify-center transition-all duration-1000 ${progress >= 100 ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}>
      {/* Floating particles in background */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute bg-gray-500 rounded-full animate-float-particle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${1 + Math.random() * 3}px`,
              height: `${1 + Math.random() * 3}px`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${10 + Math.random() * 20}s`,
              opacity: 0.1 + Math.random() * 0.3
            }}
          />
        ))}
      </div>

      {/* Radial gradient spotlight */}
      <div className="absolute inset-0 opacity-40" style={{
        background: 'radial-gradient(circle at center, rgba(156, 163, 175, 0.2) 0%, transparent 60%)'
      }} />

      {/* Main loader container */}
      <div className="relative z-10 flex flex-col items-center">
        {/* Particle Constellation Container */}
        <div className="relative w-80 h-80 mb-12">
          {/* Outer rotating rings */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="absolute w-64 h-64 border border-gray-600/30 rounded-full animate-spin-slow" />
            <div className="absolute w-52 h-52 border border-gray-500/20 rounded-full animate-spin-reverse" style={{ animationDuration: '20s' }} />
          </div>

          {/* Pulsing circles */}
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="absolute inset-0 flex items-center justify-center"
            >
              <div
                className="absolute border border-gray-400/20 rounded-full animate-pulse-ring"
                style={{
                  width: `${180 + i * 40}px`,
                  height: `${180 + i * 40}px`,
                  animationDelay: `${i * 0.7}s`,
                  animationDuration: '2.1s'
                }}
              />
            </div>
          ))}

          {/* Constellation particles and connections */}
          <div className="absolute inset-0" style={{ animation: 'spin-slow 40s linear infinite' }}>
            <svg className="w-full h-full" viewBox="0 0 100 100" style={{ transformOrigin: 'center' }}>
              <g>
                {/* Connection lines */}
                <g className="animate-fade-in" style={{ animationDuration: '2s' }}>
                  {connections.map(([start, end], i) => (
                    <line
                      key={i}
                      x1={particles[start].x}
                      y1={particles[start].y}
                      x2={particles[end].x}
                      y2={particles[end].y}
                      stroke="rgba(156, 163, 175, 0.4)"
                      strokeWidth="0.5"
                      className="animate-line-draw"
                      style={{
                        animationDelay: `${i * 0.1}s`,
                        strokeDasharray: '100',
                        strokeDashoffset: '100'
                      }}
                    />
                  ))}
                </g>

                {/* Particles - rotating */}
                {particles.map((particle, i) => (
                  <g key={i}>
                    {/* Glow */}
                    <circle
                      cx={particle.x}
                      cy={particle.y}
                      r={particle.size * 2.5}
                      fill="rgba(156, 163, 175, 0.25)"
                    />
                    {/* Core */}
                    <circle
                      cx={particle.x}
                      cy={particle.y}
                      r={particle.size}
                      fill="url(#particleGradient)"
                      className="animate-particle-pop"
                      style={{ animationDelay: `${particle.delay}s` }}
                    />
                  </g>
                ))}
              </g>

              {/* Gradient definitions */}
              <defs>
                <linearGradient id="particleGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#f3f4f6" />
                  <stop offset="100%" stopColor="#9ca3af" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          {/* Orbiting particles */}
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              className="absolute inset-0 flex items-center justify-center animate-orbit"
              style={{
                animationDelay: `${i * 0.5}s`,
                animationDuration: `${8 + i * 2}s`
              }}
            >
              <div
                className="absolute bg-gradient-to-br from-gray-300 to-gray-500 rounded-full shadow-lg shadow-gray-500/50"
                style={{
                  width: `${4 + i}px`,
                  height: `${4 + i}px`,
                  left: `${50 + 30 * Math.cos(i * Math.PI / 2)}%`,
                  top: '50%',
                  transform: 'translate(-50%, -50%)'
                }}
              />
            </div>
          ))}

          {/* Central glowing core */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative">
              <div className="w-8 h-8 bg-gradient-to-br from-gray-200 to-gray-400 rounded-full animate-pulse shadow-2xl shadow-gray-400/50" style={{ animationDuration: '2s' }} />
              <div className="absolute inset-0 bg-gray-300 rounded-full blur-xl opacity-60 animate-pulse" style={{ animationDuration: '2s' }} />
            </div>
          </div>
        </div>

        {/* Enhanced loading text */}
        <div className="text-center mb-8 space-y-3">
          <h2 className="text-3xl font-display font-extrabold text-white tracking-tight animate-fade-in">
            <span className="inline-block animate-text-shimmer bg-gradient-to-r from-gray-200 via-white to-gray-200 bg-clip-text text-transparent bg-[length:200%_auto]">
              Loading Portfolio
            </span>
          </h2>
          <p className="text-gray-400 text-sm tracking-wider animate-fade-in" style={{ animationDelay: '0.2s' }}>
            Assembling digital constellation...
          </p>
        </div>

        {/* Enhanced progress bar */}
        <div className="w-80 h-2 bg-gray-800/50 rounded-full overflow-hidden shadow-inner backdrop-blur-sm border border-gray-700/30">
          <div 
            className="h-full bg-gradient-to-r from-gray-600 via-gray-300 to-gray-600 rounded-full transition-all duration-500 ease-out relative shadow-lg shadow-gray-500/50"
            style={{ width: `${progress}%` }}
          >
            {/* Animated shine overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-60 animate-shimmer" />
            {/* Glow effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-gray-400/50 via-gray-200/50 to-gray-400/50 blur-sm" />
          </div>
        </div>

        {/* Enhanced progress percentage with animation */}
        <div className="mt-6 flex items-center gap-3">
          <div className="text-2xl font-mono font-bold text-gray-300 tracking-wider tabular-nums">
            {Math.round(progress)}%
          </div>
          {progress < 100 && (
            <div className="flex gap-1">
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
            </div>
          )}
        </div>
      </div>

      {/* Enhanced corner decorations with animation */}
      <div className="absolute top-0 left-0 w-40 h-40 border-t-2 border-l-2 border-gray-600/30 opacity-50 animate-fade-in" style={{ animationDuration: '2s' }} />
      <div className="absolute bottom-0 right-0 w-40 h-40 border-b-2 border-r-2 border-gray-600/30 opacity-50 animate-fade-in" style={{ animationDuration: '2s' }} />
      <div className="absolute top-10 left-10 w-20 h-20 border-t border-l border-gray-500/20 opacity-30" />
      <div className="absolute bottom-10 right-10 w-20 h-20 border-b border-r border-gray-500/20 opacity-30" />
    </div>
  );
};

export default Loader;
