import { useState, useEffect } from 'react';
import { navLinks } from '../utils/constants';
import { scrollToSection } from '../utils/helpers';

/**
 * Responsive Navbar with scroll detection and mobile menu
 */
const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  // Handle scroll detection
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      // Detect active section
      const sections = navLinks.map(link => document.getElementById(link.id));
      const scrollPosition = window.scrollY + 100;

      sections.forEach((section, index) => {
        if (section) {
          const sectionTop = section.offsetTop;
          const sectionBottom = sectionTop + section.offsetHeight;

          if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
            setActiveSection(navLinks[index].id);
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (sectionId) => {
    scrollToSection(sectionId);
    setIsMobileMenuOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-dark-300/90 backdrop-blur-xl shadow-lg shadow-primary-500/10 border-b border-primary-500/10'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Enhanced Logo with gradient animation */}
          <div className="flex-shrink-0">
            <button
              onClick={() => handleNavClick('home')}
              className="relative text-2xl md:text-3xl font-display font-extrabold tracking-tight bg-gradient-to-r from-gray-100 via-gray-300 to-gray-400 bg-clip-text text-transparent hover:scale-110 transition-all duration-300 group"
            >
              <span className="relative z-10">Portfolio</span>
              <div className="absolute inset-0 bg-gradient-to-r from-gray-400/20 to-gray-600/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </button>
          </div>

          {/* Enhanced Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-2">
              {navLinks.map((link, index) => (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium tracking-wide transition-all duration-300 relative group ${
                    activeSection === link.id
                      ? 'text-gray-200 bg-primary-500/10'
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  {link.title}
                  {/* Animated underline */}
                  <span
                    className={`absolute bottom-1 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-primary-400 to-primary-600 rounded-full transition-all duration-300 ${
                      activeSection === link.id ? 'w-3/4' : 'group-hover:w-3/4'
                    }`}
                  />
                  {/* Glow effect */}
                  {activeSection === link.id && (
                    <div className="absolute inset-0 bg-primary-500/5 rounded-lg blur-md" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Enhanced Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="relative inline-flex items-center justify-center p-2 rounded-lg text-gray-400 hover:text-white hover:bg-primary-600/20 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all duration-300 border border-primary-500/20"
              aria-label="Toggle menu"
            >
              <svg
                className={`h-6 w-6 transition-transform duration-300 ${isMobileMenuOpen ? 'rotate-90' : ''}`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Enhanced Mobile menu */}
      <div
        className={`md:hidden transition-all duration-300 ease-in-out overflow-hidden ${
          isMobileMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-2 pt-2 pb-3 space-y-2 sm:px-3 bg-dark-300/95 backdrop-blur-xl border-t border-primary-500/10">
          {navLinks.map((link, index) => (
            <button
              key={link.id}
              onClick={() => handleNavClick(link.id)}
              className={`block w-full text-left px-4 py-3 rounded-lg text-base font-medium transition-all duration-300 ${
                activeSection === link.id
                  ? 'bg-gradient-to-r from-primary-600 to-primary-700 text-white shadow-lg shadow-primary-600/30'
                  : 'text-gray-300 hover:bg-primary-600/10 hover:text-white border border-transparent hover:border-primary-500/20'
              }`}
              style={{ animationDelay: `${index * 50}ms` }}
            >
              {link.title}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
