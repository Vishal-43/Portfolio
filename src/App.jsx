import { Suspense, useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Loader, { WaterDropLoader } from './components/Loader';
import { hasWebGLSupport } from './utils/helpers';

/**
 * Main App Component
 */
function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check WebGL support
    if (!hasWebGLSupport()) {
      console.warn('WebGL is not supported in this browser');
    }

    // Smooth scroll behavior
    document.documentElement.style.scrollBehavior = 'smooth';
  }, []);

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  return (
    <>
      {/* Water Drop Loading Screen */}
      {isLoading && <WaterDropLoader onLoadingComplete={handleLoadingComplete} />}
      
      <div className="min-h-screen bg-dark-300 text-white">
        {/* Navigation */}
        <Navbar />

      {/* Main Content */}
      <main className="relative">
        <Suspense fallback={<Loader />}>
          {/* Hero Section */}
          <Hero />

          {/* About Section */}
          <About />

          {/* Projects Section */}
          <Projects />

          {/* Skills Section */}
          <Skills />

          {/* Experience Section */}
          <Experience />

          {/* Contact Section */}
          <Contact />
        </Suspense>
      </main>

      {/* Footer */}
      <Footer />

      {/* Scroll to Top Button */}
      <ScrollToTop />
    </div>
    </>
  );
}

/**
 * Enhanced Scroll to Top Button Component
 */
const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const toggleVisibility = () => {
      const scrolled = window.pageYOffset;
      const winHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrolledPercentage = (scrolled / winHeight) * 100;
      
      setIsVisible(scrolled > 500);
      setScrollProgress(scrolledPercentage);
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-8 right-8 z-50 w-14 h-14 bg-gradient-to-br from-primary-600 to-primary-700 text-white rounded-full shadow-xl hover:shadow-2xl hover:shadow-primary-600/50 hover:scale-110 transition-all duration-300 flex items-center justify-center group ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16 pointer-events-none'
      }`}
      aria-label="Scroll to top"
    >
      {/* Progress ring */}
      <svg className="absolute inset-0 w-14 h-14 -rotate-90">
        <circle
          cx="28"
          cy="28"
          r="26"
          stroke="rgba(255,255,255,0.1)"
          strokeWidth="2"
          fill="none"
        />
        <circle
          cx="28"
          cy="28"
          r="26"
          stroke="white"
          strokeWidth="2"
          fill="none"
          strokeDasharray={`${2 * Math.PI * 26}`}
          strokeDashoffset={`${2 * Math.PI * 26 * (1 - scrollProgress / 100)}`}
          className="transition-all duration-150"
        />
      </svg>
      
      {/* Arrow icon */}
      <svg className="w-6 h-6 relative z-10 group-hover:-translate-y-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
      </svg>
      
      {/* Glow effect */}
      <div className="absolute inset-0 bg-primary-500 rounded-full blur-lg opacity-50 group-hover:opacity-75 transition-opacity duration-300" />
    </button>
  );
};

export default App
