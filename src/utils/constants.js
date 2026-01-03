// Project constants and data

export const navLinks = [
  { id: 'home', title: 'Home' },
  { id: 'about', title: 'About' },
  { id: 'projects', title: 'Projects' },
  { id: 'skills', title: 'Skills' },
  { id: 'experience', title: 'Experience' },
  { id: 'contact', title: 'Contact' },
];

export const projects = [
  {
    id: 1,
    title: 'E-Commerce Platform',
    description: 'Full-stack MERN e-commerce with payment integration, admin dashboard, and real-time inventory management.',
    image: '/projects/ecommerce.jpg',
    tags: ['React', 'Node.js', 'MongoDB', 'Stripe'],
    github: 'https://github.com/yourusername/ecommerce',
    demo: 'https://ecommerce-demo.com',
    featured: true,
  },
  {
    id: 2,
    title: 'AI Image Generator',
    description: 'Web app using OpenAI DALL-E API to generate images from text prompts with gallery and sharing features.',
    image: '/projects/ai-image.jpg',
    tags: ['React', 'OpenAI', 'Tailwind', 'Express'],
    github: 'https://github.com/yourusername/ai-image',
    demo: 'https://ai-image-demo.com',
    featured: true,
  },
  {
    id: 3,
    title: 'Real-Time Chat Application',
    description: 'WebSocket-based chat app with rooms, private messaging, file sharing, and typing indicators.',
    image: '/projects/chat.jpg',
    tags: ['React', 'Socket.io', 'Node.js', 'Redis'],
    github: 'https://github.com/yourusername/chat',
    demo: 'https://chat-demo.com',
    featured: true,
  },
  {
    id: 4,
    title: 'Task Management Dashboard',
    description: 'Kanban-style project management tool with drag-and-drop, team collaboration, and analytics.',
    image: '/projects/taskmanager.jpg',
    tags: ['React', 'TypeScript', 'Firebase', 'DnD Kit'],
    github: 'https://github.com/yourusername/taskmanager',
    demo: 'https://taskmanager-demo.com',
    featured: false,
  },
  {
    id: 5,
    title: 'Weather Forecast App',
    description: 'Beautiful weather app with location detection, 7-day forecast, and interactive maps.',
    image: '/projects/weather.jpg',
    tags: ['React', 'OpenWeather API', 'Mapbox', 'Chart.js'],
    github: 'https://github.com/yourusername/weather',
    demo: 'https://weather-demo.com',
    featured: false,
  },
  {
    id: 6,
    title: 'Portfolio Generator',
    description: 'SaaS tool to create customizable developer portfolios with templates and deployment.',
    image: '/projects/portfolio-gen.jpg',
    tags: ['Next.js', 'Prisma', 'PostgreSQL', 'Vercel'],
    github: 'https://github.com/yourusername/portfolio-gen',
    demo: 'https://portfolio-gen-demo.com',
    featured: false,
  },
];

export const skills = {
  frontend: [
    { name: 'React', level: 95, icon: '⚛️' },
    { name: 'TypeScript', level: 90, icon: '📘' },
    { name: 'Three.js', level: 85, icon: '🎨' },
    { name: 'Tailwind CSS', level: 92, icon: '🎭' },
    { name: 'Next.js', level: 88, icon: '▲' },
    { name: 'Vue.js', level: 75, icon: '💚' },
  ],
  backend: [
    { name: 'Node.js', level: 90, icon: '🟢' },
    { name: 'Express', level: 88, icon: '🚂' },
    { name: 'Python', level: 85, icon: '🐍' },
    { name: 'MongoDB', level: 82, icon: '🍃' },
    { name: 'PostgreSQL', level: 80, icon: '🐘' },
    { name: 'GraphQL', level: 75, icon: '◼️' },
  ],
  tools: [
    { name: 'Git', level: 95, icon: '📦' },
    { name: 'Docker', level: 80, icon: '🐳' },
    { name: 'AWS', level: 75, icon: '☁️' },
    { name: 'Vite', level: 92, icon: '⚡' },
    { name: 'Webpack', level: 78, icon: '📦' },
    { name: 'CI/CD', level: 82, icon: '🔄' },
  ],
  mlai: [
    { name: 'TensorFlow', level: 70, icon: '🧠' },
    { name: 'PyTorch', level: 68, icon: '🔥' },
    { name: 'OpenAI API', level: 85, icon: '🤖' },
    { name: 'Scikit-learn', level: 75, icon: '📊' },
  ],
};

export const experience = [
  {
    id: 1,
    role: 'Senior Frontend Developer',
    company: 'Tech Innovators Inc.',
    period: 'Jan 2023 - Present',
    location: 'San Francisco, CA',
    description: 'Leading frontend development for enterprise SaaS products, mentoring junior developers, and architecting scalable React applications.',
    responsibilities: [
      'Architected and developed micro-frontend architecture using React and Module Federation',
      'Reduced page load time by 60% through code splitting and lazy loading optimization',
      'Mentored team of 5 junior developers on React best practices and design patterns',
      'Implemented comprehensive testing strategy with 90% code coverage',
    ],
    technologies: ['React', 'TypeScript', 'GraphQL', 'AWS', 'Docker'],
  },
  {
    id: 2,
    role: 'Full Stack Developer',
    company: 'Digital Solutions Co.',
    period: 'Jun 2021 - Dec 2022',
    location: 'Remote',
    description: 'Built and maintained full-stack web applications using modern JavaScript frameworks and cloud technologies.',
    responsibilities: [
      'Developed RESTful APIs and microservices using Node.js and Express',
      'Created responsive React applications with Redux for state management',
      'Integrated third-party APIs including Stripe, SendGrid, and AWS S3',
      'Collaborated with designers and product managers in Agile environment',
    ],
    technologies: ['React', 'Node.js', 'MongoDB', 'Redis', 'Git'],
  },
  {
    id: 3,
    role: 'Frontend Developer',
    company: 'Creative Web Agency',
    period: 'Jan 2020 - May 2021',
    location: 'New York, NY',
    description: 'Created pixel-perfect responsive websites and interactive web experiences for diverse clients.',
    responsibilities: [
      'Built 20+ client websites using React, Vue.js, and modern CSS frameworks',
      'Implemented complex animations using GSAP and Three.js',
      'Ensured cross-browser compatibility and accessibility standards (WCAG 2.1)',
      'Optimized websites for SEO and performance (Lighthouse score 95+)',
    ],
    technologies: ['React', 'Vue.js', 'GSAP', 'Three.js', 'Sass'],
  },
];

export const socialLinks = [
  {
    name: 'GitHub',
    url: 'https://github.com/yourusername',
    icon: '💻',
  },
  {
    name: 'LinkedIn',
    url: 'https://linkedin.com/in/yourusername',
    icon: '💼',
  },
  {
    name: 'Twitter',
    url: 'https://twitter.com/yourusername',
    icon: '🐦',
  },
  {
    name: 'Email',
    url: 'mailto:your.email@example.com',
    icon: '📧',
  },
];

export const emailJSConfig = {
  serviceId: 'YOUR_SERVICE_ID',
  templateId: 'YOUR_TEMPLATE_ID',
  publicKey: 'YOUR_PUBLIC_KEY',
};
