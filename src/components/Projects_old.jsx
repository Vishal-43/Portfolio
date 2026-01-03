import { useState } from 'react';
import SectionBackground from './layout/SectionBackground';
import ProjectCard from './cards/ProjectCard';
import usePortfolioData from '../hooks/usePortfolioData';

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
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            <span className="bg-gradient-to-r from-primary-400 to-primary-600 bg-clip-text text-transparent">
              {projectsData.title}
            </span>
          </h2>
          <p className="text-gray-400 text-lg md:text-xl max-w-3xl mx-auto">
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

  const filters = ['all', 'React', 'Node.js', 'Three.js', 'AI'];

  const filteredProjects = filter === 'all' 
    ? projects 
    : projects.filter(project => project.tags.includes(filter));

  return (
    <section id="projects" className="relative py-20 md:py-32 bg-dark-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            <span className="bg-gradient-to-r from-primary-400 to-primary-600 bg-clip-text text-transparent">
              Featured Projects
            </span>
          </h2>
          <p className="text-gray-400 text-lg md:text-xl max-w-3xl mx-auto">
            A showcase of my recent work and creative experiments
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {filters.map((filterOption) => (
            <button
              key={filterOption}
              onClick={() => setFilter(filterOption)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                filter === filterOption
                  ? 'bg-primary-600 text-white shadow-lg shadow-primary-600/50'
                  : 'bg-dark-100 text-gray-400 hover:bg-dark-200 hover:text-white'
              }`}
            >
              {filterOption.charAt(0).toUpperCase() + filterOption.slice(1)}
            </button>
          ))}
        </div>

        {/* Bento Grid */}
        <div
          ref={containerRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredProjects.map((project, index) => (
            <div
              key={project.id}
              className={`project-card group relative bg-dark-100 rounded-xl overflow-hidden border border-primary-600/20 hover:border-primary-600 transition-all duration-500 cursor-pointer ${
                project.featured ? 'md:col-span-2 md:row-span-2' : ''
              }`}
              onClick={() => setSelectedProject(project)}
              style={{
                transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg)',
                transition: 'transform 0.6s ease-out',
              }}
              onMouseMove={(e) => {
                const card = e.currentTarget;
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                const rotateX = (y - centerY) / 20;
                const rotateY = (centerX - x) / 20;
                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)';
              }}
            >
              {/* Project Image */}
              <div className={`relative overflow-hidden ${project.featured ? 'h-96' : 'h-64'}`}>
                <div className="absolute inset-0 bg-gradient-to-br from-primary-600 to-primary-800 opacity-80 group-hover:opacity-90 transition-opacity duration-300" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-6xl md:text-8xl opacity-20 group-hover:scale-110 transition-transform duration-500">
                    {project.tags[0] === 'React' ? '⚛️' : project.tags[0] === 'AI' ? '🤖' : '💻'}
                  </div>
                </div>
              </div>

              {/* Project Info */}
              <div className="p-6">
                <h3 className="text-xl md:text-2xl font-bold text-white mb-3 group-hover:text-primary-400 transition-colors duration-300">
                  {project.title}
                </h3>
                <p className="text-gray-400 text-sm md:text-base mb-4 line-clamp-2">
                  {project.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 bg-dark-200 text-primary-400 text-xs rounded-full border border-primary-600/30"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Links */}
                <div className="flex gap-4">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="flex items-center gap-2 text-gray-400 hover:text-primary-400 transition-colors duration-300"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                    <span className="text-sm">Code</span>
                  </a>
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="flex items-center gap-2 text-gray-400 hover:text-primary-400 transition-colors duration-300"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                    <span className="text-sm">Demo</span>
                  </a>
                </div>
              </div>

              {/* Hover Gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary-600/0 via-primary-600/0 to-primary-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            </div>
          ))}
        </div>

        {/* View More Button */}
        <div className="text-center mt-12">
          <a
            href="https://github.com/yourusername"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 bg-dark-100 text-white border border-primary-600/50 rounded-lg font-semibold hover:bg-primary-600 hover:border-primary-600 transition-all duration-300 hover:scale-105"
          >
            <span>View More on GitHub</span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </a>
        </div>
      </div>

      {/* Project Modal (if needed) */}
      {selectedProject && (
        <div
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedProject(null)}
        >
          <div
            className="bg-dark-100 rounded-xl max-w-3xl w-full p-8 border border-primary-600 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <h3 className="text-3xl font-bold text-white mb-4">{selectedProject.title}</h3>
            <p className="text-gray-300 mb-6">{selectedProject.description}</p>
            
            <div className="flex flex-wrap gap-2 mb-6">
              {selectedProject.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 bg-dark-200 text-primary-400 text-sm rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="flex gap-4">
              <a
                href={selectedProject.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 px-6 py-3 bg-dark-200 text-white rounded-lg text-center hover:bg-primary-600 transition-colors duration-300"
              >
                View Code
              </a>
              <a
                href={selectedProject.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 px-6 py-3 bg-primary-600 text-white rounded-lg text-center hover:bg-primary-700 transition-colors duration-300"
              >
                Live Demo
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Projects;
