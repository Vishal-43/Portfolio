import { ExternalLink, Github } from 'lucide-react';

/**
 * Project Card Component - Enhanced with better animations
 */
const ProjectCard = ({ project }) => {
  return (
    <div className="group bg-dark-400 border border-primary-500/20 rounded-xl p-6 hover:border-primary-500/50 transition-all hover:transform hover:scale-105 hover:shadow-2xl hover:shadow-primary-500/20 duration-300">
      {/* Enhanced gradient background with shimmer effect */}
      <div className="w-full h-32 bg-gradient-to-br from-primary-600 via-primary-700 to-primary-900 rounded-lg mb-4 flex items-center justify-center relative overflow-hidden shimmer">
        <div className="absolute inset-0 bg-dark-300/30 backdrop-blur-sm" />
        <div className="absolute inset-0 bg-gradient-to-t from-primary-900/50 to-transparent" />
        <span className="text-5xl opacity-50 relative z-10 text-white group-hover:scale-110 transition-transform duration-500">{"< >"}</span>
        {/* Animated glow effect */}
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-primary-400/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-pulse" />
        {/* Corner accent */}
        <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-primary-400/20 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
      
      {/* Badges with slide-in animation */}
      {project.badges && project.badges.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-3">
          {project.badges.map((badge, index) => (
            <span 
              key={badge} 
              className="text-xs bg-primary-600/20 text-primary-400 px-2 py-1 rounded font-semibold border border-primary-500/30 hover:bg-primary-600/30 hover:scale-105 transition-all duration-200"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              {badge}
            </span>
          ))}
        </div>
      )}
      
      <h3 className="text-xl font-heading font-bold tracking-tight text-white mb-2 group-hover:text-gray-200 transition-colors duration-300">
        {project.title}
      </h3>
      <p className="text-gray-400 mb-4 text-sm leading-relaxed tracking-wide group-hover:text-gray-300 transition-colors">
        {project.shortDescription}
      </p>
      
      {/* Enhanced technology tags */}
      <div className="flex flex-wrap gap-2 mb-4">
        {project.technologies.map((tech, index) => (
          <span 
            key={tech} 
            className="text-xs bg-primary-500/10 text-primary-300 px-3 py-1 rounded-full border border-primary-500/20 hover:bg-primary-500/20 hover:border-primary-500/40 hover:scale-105 transition-all duration-200 cursor-default"
            style={{ animationDelay: `${index * 30}ms` }}
          >
            {tech}
          </span>
        ))}
      </div>
      
      {/* Enhanced Links with better hover effects */}
      <div className="flex gap-3">
        {project.liveUrl && (
          <a 
            href={project.liveUrl} 
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white py-2 px-4 rounded-lg text-center text-sm font-semibold transition-all duration-300 flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-primary-600/50 hover:scale-105"
          >
            <ExternalLink size={16} />
            Live Demo
          </a>
        )}
        {project.githubUrl && (
          <a 
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer" 
            className="flex-1 border border-primary-600 hover:bg-primary-600/20 text-primary-400 py-2 px-4 rounded-lg text-center text-sm font-semibold transition-all duration-300 flex items-center justify-center gap-2 hover:border-primary-500 hover:scale-105 hover:shadow-lg hover:shadow-primary-600/30"
          >
            <Github size={16} />
            Code
          </a>
        )}
      </div>
    </div>
  );
};

export default ProjectCard;
