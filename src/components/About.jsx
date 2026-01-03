import { getIcon } from '../utils/iconMap';
import SectionBackground from './layout/SectionBackground';
import { usePortfolioData } from '../hooks/usePortfolioData';

/**
 * About Section - Dynamic content from JSON
 */
const About = () => {
  const data = usePortfolioData();
  const aboutData = data.about;

  return (
    <SectionBackground id="about">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            <span className="bg-gradient-to-r from-primary-400 to-primary-600 bg-clip-text text-transparent">
              {aboutData.title}
            </span>
          </h2>
          <p className="text-gray-400 text-lg md:text-xl max-w-3xl mx-auto">
            {aboutData.subtitle}
          </p>
        </div>
        
        {/* Description */}
        <div className="mb-16">
          <p className="text-lg text-gray-300 leading-relaxed max-w-4xl mx-auto text-center">
            {aboutData.description}
          </p>
        </div>
        
        {/* Highlights Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {aboutData.highlights.map((highlight, index) => (
            <div 
              key={index}
              className="bg-dark-400 border border-primary-500/20 rounded-xl p-6 hover:border-primary-500/50 transition-all duration-300 group text-center"
            >
              <div className="inline-flex p-4 bg-primary-600/20 rounded-lg mb-4 group-hover:bg-primary-600/30 transition-colors">
                {getIcon(highlight.icon, { size: 32, className: 'text-primary-400' })}
              </div>
              <h3 className="text-xl font-bold text-white mb-2">{highlight.title}</h3>
              <p className="text-gray-400 text-sm">{highlight.description}</p>
            </div>
          ))}
        </div>
      </div>
    </SectionBackground>
  );
};

export default About;
