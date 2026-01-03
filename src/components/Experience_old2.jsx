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

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  

  return (
    <section id="experience" className="relative py-20 md:py-32 bg-dark-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            <span className="bg-gradient-to-r from-primary-400 to-primary-600 bg-clip-text text-transparent">
              Work Experience
            </span>
          </h2>
          <p className="text-gray-400 text-lg md:text-xl max-w-3xl mx-auto">
            My professional journey and key accomplishments
          </p>
        </div>

        {/* Timeline */}
        <div ref={containerRef} className="relative">
          {/* Vertical Line */}
          <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-primary-600 via-primary-500 to-primary-600/20" />

          {experience.map((exp, index) => (
            <div
              key={exp.id}
              className={`experience-card relative mb-12 ${
                index % 2 === 0 ? 'md:pr-[52%]' : 'md:pl-[52%]'
              }`}
            >
              {/* Timeline Dot */}
              <div
                className={`hidden md:block absolute top-8 ${
                  index % 2 === 0 ? 'right-[50%]' : 'left-[50%]'
                } transform translate-x-1/2 w-6 h-6 bg-primary-600 rounded-full border-4 border-dark-300 z-10 shadow-lg shadow-primary-600/50 animate-pulse`}
              />

              {/* Card */}
              <div
                className={`bg-dark-100 rounded-xl p-6 md:p-8 border border-primary-600/20 hover:border-primary-600 transition-all duration-500 cursor-pointer hover:shadow-xl hover:shadow-primary-600/20 ${
                  expandedId === exp.id ? 'border-primary-600' : ''
                } ${index % 2 === 0 ? 'md:mr-8' : 'md:ml-8'}`}
                onClick={() => toggleExpand(exp.id)}
              >
                {/* Header */}
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <h3 className="text-xl md:text-2xl font-bold text-white mb-2 group-hover:text-primary-400 transition-colors">
                      {exp.role}
                    </h3>
                    <div className="text-primary-400 font-semibold text-lg mb-1">
                      {exp.company}
                    </div>
                    <div className="flex flex-wrap gap-3 text-sm text-gray-400">
                      <span className="flex items-center gap-1">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        {exp.period}
                      </span>
                      <span className="flex items-center gap-1">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        {exp.location}
                      </span>
                    </div>
                  </div>

                  {/* Expand Icon */}
                  <button className="ml-4 text-primary-400 hover:text-primary-300 transition-transform duration-300">
                    <svg
                      className={`w-6 h-6 transition-transform duration-300 ${
                        expandedId === exp.id ? 'rotate-180' : ''
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                </div>

                {/* Description */}
                <p className="text-gray-300 mb-4">{exp.description}</p>

                {/* Expandable Content */}
                <div
                  className={`overflow-hidden transition-all duration-500 ${
                    expandedId === exp.id ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  {/* Responsibilities */}
                  <div className="mb-6">
                    <h4 className="text-white font-semibold mb-3 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-primary-600 rounded-full" />
                      Key Responsibilities
                    </h4>
                    <ul className="space-y-2 ml-4">
                      {exp.responsibilities.map((resp, idx) => (
                        <li key={idx} className="text-gray-400 text-sm flex items-start gap-2">
                          <span className="text-primary-400 mt-1">▹</span>
                          <span>{resp}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Technologies */}
                  <div>
                    <h4 className="text-white font-semibold mb-3 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-primary-600 rounded-full" />
                      Technologies Used
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {exp.technologies.map((tech, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 bg-dark-200 text-primary-400 text-xs rounded-full border border-primary-600/30 hover:border-primary-600 hover:scale-105 transition-all duration-300"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Download Resume Button */}
        <div className="text-center mt-16">
          <a
            href="/resume.pdf"
            download
            className="inline-flex items-center gap-3 px-8 py-4 bg-primary-600 text-white rounded-lg font-semibold text-lg hover:bg-primary-700 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-primary-600/50"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <span>Download Resume</span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Experience;
