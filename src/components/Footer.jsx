import { scrollToSection } from '../utils/helpers';
import { usePortfolioData } from '../hooks/usePortfolioData';
import { getIcon } from '../utils/iconMap';

/**
 * Enhanced Footer Component with modern styling
 */
const Footer = () => {
  const data = usePortfolioData();
  const personalData = data.personal;
  const contactData = data.contact;
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-gradient-to-b from-dark-300 to-dark-200 border-t border-primary-600/20 overflow-hidden">
      {/* Decorative gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-600/5 via-transparent to-primary-900/5 pointer-events-none" />
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary-500 to-transparent" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Enhanced Brand Section */}
          <div className="space-y-4">
            <h3 className="text-2xl font-display font-extrabold tracking-tight bg-gradient-to-r from-gray-200 via-gray-300 to-gray-400 bg-clip-text text-transparent mb-4 hover:scale-105 transition-transform duration-300 inline-block">
              {personalData.name}
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed tracking-wide">
              {personalData.bio}
            </p>
            {/* Decorative line */}
            <div className="w-20 h-1 bg-gradient-to-r from-primary-500 to-transparent rounded-full" />
          </div>

          {/* Enhanced Quick Links */}
          <div>
            <h4 className="text-white font-heading font-semibold tracking-wide mb-4 flex items-center gap-2">
              <span className="w-2 h-2 bg-gray-400 rounded-full animate-pulse" />
              Quick Links
            </h4>
            <div className="space-y-2">
              {['Home', 'About', 'Projects', 'Skills', 'Experience', 'Contact'].map((link) => (
                <button
                  key={link}
                  onClick={() => scrollToSection(link.toLowerCase())}
                  className="block text-gray-400 hover:text-primary-400 transition-all duration-300 text-sm hover:translate-x-2 group"
                >
                  <span className="inline-flex items-center gap-2">
                    <span className="w-0 h-px bg-primary-500 group-hover:w-4 transition-all duration-300" />
                    {link}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Enhanced Social Links */}
          <div>
            <h4 className="text-white font-heading font-semibold tracking-wide mb-4 flex items-center gap-2">
              <span className="w-2 h-2 bg-gray-400 rounded-full animate-pulse" />
              Connect
            </h4>
            <div className="flex gap-3 flex-wrap">
              {contactData.socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative w-11 h-11 bg-dark-100 rounded-lg flex items-center justify-center border border-primary-600/20 hover:border-primary-500 hover:bg-primary-600/10 transition-all duration-300 overflow-hidden"
                  title={social.name}
                >
                  {/* Animated background */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary-500/0 to-primary-600/0 group-hover:from-primary-500/20 group-hover:to-primary-600/20 transition-all duration-300" />
                  <span className="relative z-10 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300">
                    {getIcon(social.icon, { size: 20 })}
                  </span>
                  {/* Glow effect on hover */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute inset-0 bg-primary-500/20 blur-md" />
                  </div>
                </a>
              ))}
            </div>
            {/* Additional contact info */}
            <div className="mt-6 space-y-2">
              <p className="text-gray-500 text-xs flex items-center gap-2">
                <span className="w-1 h-1 bg-primary-500 rounded-full" />
                Made with passion & code
              </p>
            </div>
          </div>
        </div>

        {/* Enhanced Bottom Bar */}
        <div className="pt-8 border-t border-primary-600/20">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm text-center md:text-left">
              © {currentYear} {personalData.name}. All rights reserved.
            </p>
            <div className="flex items-center gap-2 text-gray-500 text-xs tracking-wider">
              <span>Built with</span>
              <span className="text-gray-300 font-semibold">React</span>
              <span>•</span>
              <span className="text-gray-300 font-semibold">Three.js</span>
              <span>•</span>
              <span className="text-gray-300 font-semibold">Tailwind CSS</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Decorative bottom gradient */}
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary-500/50 to-transparent" />
    </footer>
  );
};

export default Footer;
