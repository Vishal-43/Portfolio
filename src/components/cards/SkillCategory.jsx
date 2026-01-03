import { getIcon } from '../../utils/iconMap';

/**
 * Skill Category Component with skill bars
 */
const SkillCategory = ({ category }) => {
  return (
    <div className="bg-dark-400 border border-primary-500/20 rounded-xl p-6 hover:border-primary-500/50 transition-all duration-300">
      {/* Category header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-primary-600/20 rounded-lg">
          {getIcon(category.icon, { size: 24, className: 'text-primary-400' })}
        </div>
        <h3 className="text-xl font-bold text-white">{category.name}</h3>
      </div>
      
      {/* Skill bars */}
      <div className="space-y-4">
        {category.skills.map(skill => (
          <div key={skill.name}>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-300">{skill.name}</span>
              <span className="text-sm font-bold text-primary-400">{skill.proficiency}%</span>
            </div>
            <div className="h-2 bg-dark-300 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-primary-600 to-primary-400 rounded-full transition-all duration-1000 ease-out"
                style={{ 
                  width: `${skill.proficiency}%`,
                  boxShadow: '0 0 10px rgba(56, 189, 248, 0.5)'
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkillCategory;
