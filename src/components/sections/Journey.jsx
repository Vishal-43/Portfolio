import SectionBackground from '../layout/SectionBackground';
import MilestoneCard from '../cards/MilestoneCard';
import { usePortfolioData } from '../../hooks/usePortfolioData';

/**
 * Journey Section - Dynamic timeline from JSON
 */
const Journey = () => {
  const data = usePortfolioData();
  const journeyData = data.journey;

  return (
    <SectionBackground id="journey">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            {journeyData.title}
          </h2>
          <p className="text-xl text-gray-400">
            {journeyData.subtitle}
          </p>
        </div>
        
        {/* Vertical timeline - automatically grows with more milestones */}
        <div className="relative">
          <div className="absolute left-1/2 transform -translate-x-1/2 top-0 bottom-0 w-0.5 bg-primary-600" />
          
          {journeyData.milestones.map((milestone, index) => (
            <MilestoneCard 
              key={milestone.year} 
              milestone={milestone} 
              index={index} 
            />
          ))}
        </div>
      </div>
    </SectionBackground>
  );
};

export default Journey;
