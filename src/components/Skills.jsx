import { usePortfolioData } from '../hooks/usePortfolioData';
import SectionBackground from './layout/SectionBackground';
import SkillCategory from './cards/SkillCategory';

/**
 * Skills Section - Dynamic rendering from portfolioData.json
 */
const Skills = () => {
  const data = usePortfolioData();
  const skillsData = data.skills;

  return (
    <SectionBackground id="skills" showStars>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            <span className="bg-gradient-to-r from-primary-400 to-primary-600 bg-clip-text text-transparent">
              {skillsData.title}
            </span>
          </h2>
          <p className="text-gray-400 text-lg md:text-xl max-w-3xl mx-auto">
            {skillsData.description}
          </p>
        </div>

        {/* Skills Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {skillsData.categories.map((category, index) => (
            <SkillCategory key={index} category={category} />
          ))}
        </div>
      </div>
    </SectionBackground>
  );
};

export default Skills;
