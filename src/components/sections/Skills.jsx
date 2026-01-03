import SectionBackground from '../layout/SectionBackground';
import SkillCategory from '../cards/SkillCategory';
import { usePortfolioData } from '../../hooks/usePortfolioData';

/**
 * Skills Section - Dynamic skill bars from JSON
 */
const Skills = () => {
  const data = usePortfolioData();
  const skillsData = data.skills;

  return (
    <SectionBackground id="skills" showStars={true}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            {skillsData.title}
          </h2>
          <p className="text-xl text-gray-400">
            {skillsData.subtitle}
          </p>
        </div>
        
        {/* Dynamic skill categories with dynamic skill bars */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {skillsData.categories.map(category => (
            <SkillCategory key={category.name} category={category} />
          ))}
        </div>
      </div>
    </SectionBackground>
  );
};

export default Skills;
