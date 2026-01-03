import SectionBackground from './layout/SectionBackground';
import ExperienceCard from './cards/ExperienceCard';
import { usePortfolioData } from '../hooks/usePortfolioData';

/**
 * Experience Section - Dynamic timeline from JSON
 */
const Experience = () => {
  const data = usePortfolioData();
  const experienceData = data.experience;

  return (
    <SectionBackground id="experience">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            <span className="bg-gradient-to-r from-primary-400 to-primary-600 bg-clip-text text-transparent">
              {experienceData.title}
            </span>
          </h2>
          <p className="text-gray-400 text-lg md:text-xl max-w-3xl mx-auto">
            {experienceData.subtitle}
          </p>
        </div>
        
        {/* Timeline - Dynamic experience cards */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-0 top-0 bottom-0 w-px bg-primary-600/30" />
          
          {/* Experience Cards */}
          <div className="space-y-8">
            {experienceData.items.map((exp, index) => (
              <ExperienceCard key={exp.id} experience={exp} index={index} />
            ))}
          </div>
        </div>
      </div>
    </SectionBackground>
  );
};

export default Experience;
