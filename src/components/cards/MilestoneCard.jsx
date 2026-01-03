import { getIcon } from '../../utils/iconMap';

/**
 * Milestone Card Component for Journey timeline
 */
const MilestoneCard = ({ milestone, index }) => {
  const isEven = index % 2 === 0;
  
  return (
    <div className={`relative flex items-center mb-12 ${isEven ? 'flex-row' : 'flex-row-reverse'}`}>
      {/* Content */}
      <div className={`w-5/12 ${isEven ? 'text-right pr-8' : 'text-left pl-8'}`}>
        <div className="bg-dark-400 border border-primary-500/20 rounded-xl p-6 hover:border-primary-500/50 transition-all duration-300 group">
          <div className={`flex items-center gap-3 mb-3 ${isEven ? 'flex-row-reverse' : 'flex-row'}`}>
            <div className="p-3 bg-primary-600/20 rounded-lg group-hover:bg-primary-600/30 transition-colors">
              {getIcon(milestone.icon, { size:24, className: 'text-primary-400' })}
            </div>
            <span className="text-2xl font-bold text-primary-400">{milestone.year}</span>
          </div>
          <h3 className="text-xl font-bold text-white mb-2">{milestone.title}</h3>
          <p className="text-gray-400 text-sm leading-relaxed">{milestone.description}</p>
        </div>
      </div>
      
      {/* Timeline dot */}
      <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full bg-primary-600 shadow-lg shadow-primary-600/50 group-hover:scale-150 transition-transform" />
      
      {/* Empty space on the other side */}
      <div className="w-5/12" />
    </div>
  );
};

export default MilestoneCard;
