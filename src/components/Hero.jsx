import { useEffect, useRef, useState, useMemo, useCallback, Component } from 'react';
import { Canvas } from '@react-three/fiber';
import { PerspectiveCamera, Stars } from '@react-three/drei';
import { EffectComposer, Bloom, ChromaticAberration } from '@react-three/postprocessing';
import { BlendFunction } from 'postprocessing';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  InteractiveParticles, 
  OrbitingObjects, 
  MorphingHeroObject, 
  DynamicLights 
} from './Canvas/InteractiveElements';
import { scrollToSection } from '../utils/helpers';
import { usePortfolioData } from '../hooks/usePortfolioData';

gsap.registerPlugin(ScrollTrigger);

// Error Boundary for 3D Canvas
class Canvas3DErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('3D Canvas Error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="absolute inset-0 flex items-center justify-center bg-dark-300">
          <p className="text-white text-lg">3D graphics unavailable. Please refresh or use a WebGL-compatible browser.</p>
        </div>
      );
    }
    return this.props.children;
  }
}

/**
 * Enhanced Hero Section with Interactive 3D Experience
 */
const Hero = () => {
  // Get portfolio data
  const data = usePortfolioData();
  const heroData = data.hero;
  const personalData = data.personal;
  
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(150);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  
  const heroRef = useRef();
  const contentRef = useRef();
  const timelineRef = useRef();
  const mouseRef = useRef({ x: 0, y: 0 });
  const normalizedMouseRef = useRef({ x: 0, y: 0 });
  const trailIdCounterRef = useRef(0);
  const [cursorTrail, setCursorTrail] = useState([]);
  
  // Configuration from JSON
  const HERO_CONFIG = useMemo(() => ({
    typewriterTitles: heroData.titles,
    typingSpeed: { normal: 150, deleting: 50 },
    pauseAfterComplete: 2000,
    cursorTrailMaxLength: 20,
    stats: heroData.stats,
    dpr: { min: 1, max: 2 },
  }), [heroData]);
  
  // Memoized titles array to prevent infinite loop
  const titles = useMemo(() => HERO_CONFIG.typewriterTitles, [HERO_CONFIG]);

  // Memoized button handlers
  const handleViewWork = useCallback(() => scrollToSection('projects'), []);
  const handleGetInTouch = useCallback(() => scrollToSection('contact'), []);

  // Ref-based mouse tracking (prevents 60+ re-renders/sec)
  useEffect(() => {
    const handleMouseMove = (e) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
      normalizedMouseRef.current = {
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1,
      };
      
      // Update cursor trail with max cap
      setCursorTrail((prev) => {
        trailIdCounterRef.current += 1;
        const newTrail = [
          { x: e.clientX, y: e.clientY, id: trailIdCounterRef.current },
          ...prev,
        ];
        return newTrail.slice(0, HERO_CONFIG.cursorTrailMaxLength);
      });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Typewriter effect
  useEffect(() => {
    const handleTyping = () => {
      const i = loopNum % titles.length;
      const fullText = titles[i];

      setText(
        isDeleting
          ? fullText.substring(0, text.length - 1)
          : fullText.substring(0, text.length + 1)
      );

      setTypingSpeed(isDeleting ? HERO_CONFIG.typingSpeed.deleting : HERO_CONFIG.typingSpeed.normal);

      if (!isDeleting && text === fullText) {
        setTimeout(() => setIsDeleting(true), HERO_CONFIG.pauseAfterComplete);
      } else if (isDeleting && text === '') {
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
      }
    };

    const timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [text, isDeleting, loopNum, typingSpeed, titles]);

  // Scroll-triggered animations
  useEffect(() => {
    if (!heroRef.current) return;

    // Pin hero section during scroll
    ScrollTrigger.create({
      trigger: heroRef.current,
      start: 'top top',
      end: '+=100%',
      pin: false,
      onUpdate: (self) => {
        setScrollProgress(self.progress);
      },
    });

    // Animate content on load
    timelineRef.current = gsap.timeline({ delay: 0.3 });
    // Don't animate opacity to avoid hiding content
    timelineRef.current.from(contentRef.current, {
      y: 30,
      duration: 0.8,
      ease: 'power3.out',
    }).add(() => setIsLoaded(true));

    return () => {
      // Proper cleanup: kill timeline and all ScrollTriggers
      if (timelineRef.current) {
        timelineRef.current.kill();
      }
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <section 
      ref={heroRef}
      id="home" 
      className="relative h-screen w-full overflow-hidden bg-dark-300"
    >
      {/* Custom Cursor Trail */}
      {cursorTrail.map((point, index) => (
        <div
          key={point.id}
          className="fixed w-2 h-2 bg-primary-400 rounded-full pointer-events-none z-50"
          style={{
            left: point.x,
            top: point.y,
            opacity: (cursorTrail.length - index) / cursorTrail.length * 0.5,
            transform: `translate(-50%, -50%) scale(${(cursorTrail.length - index) / cursorTrail.length})`,
            transition: 'opacity 0.3s ease-out',
          }}
        />
      ))}

      {/* Interactive 3D Background */}
      <div className="absolute inset-0 z-0">
        <Canvas3DErrorBoundary>
          <Canvas dpr={[HERO_CONFIG.dpr.min, Math.min(HERO_CONFIG.dpr.max, window.devicePixelRatio || 1)]}>
          <PerspectiveCamera makeDefault position={[0, 0, 8]} fov={75} />
          
          {/* Ambient Lighting */}
          <ambientLight intensity={0.3} />
          <DynamicLights mousePosition={normalizedMouseRef.current} />
          
          {/* Background Stars */}
          <Stars
            radius={100}
            depth={50}
            count={3000}
            factor={4}
            saturation={0}
            fade
            speed={1}
          />
          
          {/* Main Hero Object */}
          <MorphingHeroObject 
            mousePosition={normalizedMouseRef.current}
            scrollProgress={scrollProgress}
          />
          
          {/* Orbiting Satellites */}
          <OrbitingObjects 
            count={6}
            mousePosition={normalizedMouseRef.current}
          />
          
          {/* Interactive Particles */}
          <InteractiveParticles 
            count={800}
            mousePosition={normalizedMouseRef.current}
          />
          
          {/* Post-Processing Effects */}
          <EffectComposer>
            <Bloom
              intensity={0.8}
              luminanceThreshold={0.2}
              luminanceSmoothing={0.9}
              blendFunction={BlendFunction.SCREEN}
            />
            <ChromaticAberration
              blendFunction={BlendFunction.NORMAL}
              offset={[0.002, 0.002]}
            />
          </EffectComposer>
        </Canvas>
        </Canvas3DErrorBoundary>
      </div>

      {/* Very subtle edge vignette - center fully transparent */}
      <div className="absolute inset-0 z-10 pointer-events-none" style={{
        background: 'radial-gradient(ellipse 70% 60% at center, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.1) 70%, rgba(0, 0, 0, 0.4) 100%)'
      }} />

      {/* Hero Content - Fully Visible */}
      <div 
        ref={contentRef}
        className="relative z-20 h-full flex items-center justify-center px-4 sm:px-6 lg:px-8"
      >
        <div className="max-w-4xl w-full">
          {/* Content container with proper z-index */}
          <div className="relative z-10 px-4 sm:px-6 md:px-8 py-8 sm:py-12 md:py-16 text-center">
            {/* Animated Title */}
            <h1 
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black mb-4 sm:mb-6 px-4 sm:px-6 md:px-8 py-2 sm:py-3 md:py-4 rounded-xl sm:rounded-2xl inline-block"
              style={{
                color: '#FFFFFF',
                textShadow: '0 0 50px rgba(156, 163, 175, 0.8), 0 4px 12px rgba(0, 0, 0, 0.9)',
                letterSpacing: '-0.02em',
                WebkitFontSmoothing: 'antialiased',
              }}
            >
              Hi, I'm {personalData.name}
            </h1>
            
            {/* Typewriter Text */}
            <div className="h-16 sm:h-20 md:h-24 mb-6 sm:mb-8 w-full flex justify-center px-4 sm:px-6 md:px-8 py-2 sm:py-3 rounded-lg sm:rounded-xl">
              <p 
                className="text-lg sm:text-2xl md:text-3xl lg:text-4xl font-bold inline-flex items-center justify-center gap-2 min-w-[220px] sm:min-w-[260px]"
                style={{
                  color: '#FFFFFF',
                  textShadow: '0 0 40px rgba(156, 163, 175, 0.7), 0 2px 8px rgba(0, 0, 0, 0.9)',
                }}
              >
                <span>{text || 'Full Stack Developer'}</span>
                <span className="animate-pulse text-gray-300" style={{
                  textShadow: '0 0 30px rgba(156, 163, 175, 0.8)',
                  marginLeft: '8px',
                }}>|</span>
              </p>
            </div>

            {/* Description */}
            <p 
              className="text-sm sm:text-base md:text-lg lg:text-xl max-w-2xl mx-auto mb-8 sm:mb-12 px-4 sm:px-6 py-2 sm:py-4 rounded-lg sm:rounded-xl inline-block w-full sm:w-auto"
              style={{
                color: '#FFFFFF',
                textShadow: '0 2px 8px rgba(0, 0, 0, 0.9), 0 0 20px rgba(156, 163, 175, 0.3)',
              }}
            >
              {personalData.description}
              {personalData.bio}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center mb-8 sm:mb-12 w-full sm:w-auto">
            <button
              onClick={handleViewWork}
              className="group relative w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-primary-600 text-white rounded-lg font-semibold text-sm sm:text-base md:text-lg overflow-hidden transition-all duration-300 hover:scale-105 sm:hover:scale-110 hover:shadow-2xl hover:shadow-primary-600/50"
              style={{
                transform: 'perspective(1000px) rotateX(0deg)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'perspective(1000px) rotateX(-5deg) scale(1.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'perspective(1000px) rotateX(0deg) scale(1)';
              }}
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                {heroData.cta.primary}
                <svg className="w-4 sm:w-5 h-4 sm:h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-primary-400 to-primary-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              {/* Ripple Effect */}
              <span className="absolute inset-0 rounded-lg bg-white opacity-0 group-hover:opacity-20 group-hover:animate-ping" />
            </button>

            <button
              onClick={handleGetInTouch}
              className="group relative w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 border-2 border-primary-600 text-primary-400 rounded-lg font-semibold text-sm sm:text-base md:text-lg transition-all duration-300 hover:scale-105 sm:hover:scale-110 hover:shadow-2xl hover:shadow-primary-600/50 overflow-hidden"
            >
              <span className="relative z-10">{heroData.cta.secondary}</span>
              <div className="absolute inset-0 bg-primary-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
            </button>
          </div>

            {/* Floating Stats */}
            <div className="grid grid-cols-3 gap-3 sm:gap-4 md:gap-6 mt-6 sm:mt-8 px-2">
              {HERO_CONFIG.stats.map((stat, index) => (
                <div 
                  key={index}
                  className="group cursor-pointer"
                >
                  <div 
                    className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-primary-400 group-hover:scale-110 transition-transform"
                    style={{
                      textShadow: '0 0 20px rgba(56, 189, 248, 0.8), 0 2px 4px rgba(0, 0, 0, 0.9)',
                    }}
                  >
                    {stat.value}
                  </div>
                  <div 
                    className="text-xs sm:text-sm uppercase tracking-wider font-semibold text-white"
                    style={{
                      textShadow: '0 2px 4px rgba(0, 0, 0, 0.8)',
                    }}
                  >
                    {stat.label}
                  </div>
                </div>
              ))}
          </div>

          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-6 sm:bottom-8 md:bottom-10 left-1/2 transform -translate-x-1/2 z-30">
        <div className="flex flex-col items-center gap-2 animate-bounce">
          <span 
            className="text-xs sm:text-sm font-bold text-white"
            style={{
              textShadow: '0 0 20px rgba(56, 189, 248, 0.9), 0 2px 4px rgba(0, 0, 0, 0.9)',
            }}
          >
            Scroll to explore
          </span>
          <svg
            className="w-5 sm:w-6 h-5 sm:h-6 text-primary-400"
            style={{
              filter: 'drop-shadow(0 0 15px rgba(56, 189, 248, 1))',
            }}
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
          </svg>
        </div>
      </div>
    </section>
  );
};

export default Hero;
