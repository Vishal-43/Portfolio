import { useState } from 'react';
import SectionBackground from '../layout/SectionBackground';
import ProjectCard from '../cards/ProjectCard';
import { usePortfolioData } from '../../hooks/usePortfolioData';

/**
 * Projects Section - Dynamically render project cards from JSON
 */
const Projects = () => {
  const data = usePortfolioData();
  const projectsData = data.projects;
  const [filter, setFilter] = useState('all');

  // Filter projects based on selected category
  const filteredProjects = projectsData.items.filter(
    project => filter === 'all' || project.category === filter
  );

  return (
    <SectionBackground id="projects" showStars={true}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            {projectsData.title}
          </h2>
          <p className="text-xl text-gray-400">
            {projectsData.subtitle}
          </p>
        </div>
        
        {/* Filter Buttons */}
        <div className="flex flex-wrap gap-4 justify-center mb-12">
          {projectsData.filters.map(f => (
            <button 
              key={f}
              onClick={() => setFilter(f)}
              className={`px-6 py-2 rounded-lg font-semibold transition-all duration-300 ${
                filter === f
                  ? 'bg-primary-600 text-white shadow-lg shadow-primary-600/50'
                  : 'bg-dark-400 text-gray-400 hover:bg-dark-400/80 hover:text-white border border-primary-500/20'
              }`}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>
        
        {/* Dynamic Project Cards - automatically adds/removes based on JSON */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.length > 0 ? (
            filteredProjects.map(project => (
              <ProjectCard key={project.id} project={project} />
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-gray-400 text-lg">No projects found in this category.</p>
            </div>
          )}
        </div>
      </div>
    </SectionBackground>
  );
};

export default Projects;
