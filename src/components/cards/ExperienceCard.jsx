import { getIcon } from '../../utils/iconMap';

/**
 * Experience Card Component
 */
const ExperienceCard = ({ experience, index }) => {
  return (
    <div className="relative group">
      {/* Timeline dot */}
      <div className="absolute -left-4 top-6 w-3 h-3 rounded-full bg-primary-600 group-hover:scale-150 transition-transform duration-300 shadow-lg shadow-primary-600/50" />
      
      {/* Card */}
      <div className="ml-8 bg-dark-400 border border-primary-500/20 rounded-xl p-6 hover:border-primary-500/50 transition-all duration-300">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-primary-600/20 rounded-lg">
              {getIcon(experience.icon, { size: 24, className: 'text-primary-400' })}
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">{experience.position}</h3>
              <p className="text-primary-400 font-semibold">{experience.company}</p>
            </div>
          </div>
          <span className="text-sm text-gray-400 whitespace-nowrap ml-4">{experience.duration}</span>
        </div>
        
        {/* Description */}
        <p className="text-gray-300 mb-4">{experience.description}</p>
        
        {/* Achievements */}
        <div className="mb-4">
          <h4 className="text-sm font-semibold text-white mb-2">Key Achievements:</h4>
          <ul className="space-y-2">
            {experience.achievements.map((achievement, idx) => (
              <li key={idx} className="text-sm text-gray-400 flex items-start gap-2">
                <span className="text-primary-400 mt-1">•</span>
                <span>{achievement}</span>
              </li>
            ))}
          </ul>
        </div>
        
        {/* Technologies */}
        <div className="flex flex-wrap gap-2">
          {experience.technologies.map(tech => (
            <span 
              key={tech} 
              className="text-xs bg-primary-500/10 text-primary-300 px-3 py-1 rounded-full border border-primary-500/20"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExperienceCard;
