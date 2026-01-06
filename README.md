# Modern 3D Portfolio Website

A stunning, modern portfolio website built with React, Three.js, and React Three Fiber featuring interactive 3D elements, smooth animations, and responsive design.

![Portfolio Preview](./preview.jpg)

## ✨ Features

- **Interactive 3D Hero Section** - Animated 3D models with parallax scrolling
- **Typewriter Effect** - Dynamic text animation in hero section
- **Projects Gallery** - Bento grid layout with 3D hover effects
- **Skills Visualization** - Animated skill bars with 3D elements
- **Interactive Timeline** - Expandable experience cards with timeline
- **Functional Contact Form** - EmailJS integration with validation
- **Smooth Animations** - GSAP-powered scroll animations
- **Fully Responsive** - Mobile-first design approach
- **SEO Optimized** - Meta tags and semantic HTML
- **Accessibility** - ARIA labels and keyboard navigation

## 🚀 Tech Stack

### Frontend
- **React 18+** - Modern React with hooks
- **Vite** - Lightning-fast build tool
- **Tailwind CSS** - Utility-first styling

### 3D Graphics
- **Three.js** - WebGL 3D library
- **React Three Fiber** - React renderer for Three.js
- **Drei** - Useful helpers for R3F

### Animation
- **GSAP** - Professional-grade animation library
- **ScrollTrigger** - Scroll-based animations

### Additional
- **EmailJS** - Email service for contact form
- **React Router DOM** - Navigation (if needed)

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/portfolio.git
   cd portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Setup EmailJS** (for contact form)
   - Create an account at [EmailJS](https://www.emailjs.com/)
   - Create an email service
   - Create an email template
   - Copy your credentials
   - Update `src/utils/constants.js` with your EmailJS credentials:
     ```javascript
     export const emailJSConfig = {
       serviceId: 'YOUR_SERVICE_ID',
       templateId: 'YOUR_TEMPLATE_ID',
       publicKey: 'YOUR_PUBLIC_KEY',
     };
     ```

4. **Customize content**
   - Update personal information in `src/utils/constants.js`
   - Replace project data with your own projects
   - Update skills, experience, and social links
   - Replace placeholder text with your information

5. **Run development server**
   ```bash
   npm run dev
   ```

6. **Open in browser**
   - Navigate to `http://localhost:5173`

## 🛠️ Build for Production

```bash
npm run build
```

The optimized build will be in the `dist` folder.

## 🌐 Deployment

### Vercel (Recommended)
```bash
npm install -g vercel
vercel
```

### Netlify
```bash
npm install -g netlify-cli
netlify deploy --prod
```

### GitHub Pages
1. Update `vite.config.js` with your repository name
2. Run: `npm run build`
3. Deploy the `dist` folder

## 📁 Project Structure

```
portfolio/
├── src/
│   ├── components/
│   │   ├── Canvas/
│   │   │   ├── Scene.jsx          # Main 3D scene wrapper
│   │   │   ├── Models.jsx         # 3D models (sphere, cube, etc.)
│   │   │   └── Effects.jsx        # Lights, stars, post-processing
│   │   ├── About.jsx              # About section
│   │   ├── Contact.jsx            # Contact form
│   │   ├── Experience.jsx         # Work experience timeline
│   │   ├── Footer.jsx             # Footer component
│   │   ├── Hero.jsx               # Hero section
│   │   ├── Loader.jsx             # Loading component
│   │   ├── Navbar.jsx             # Navigation bar
│   │   ├── Projects.jsx           # Projects gallery
│   │   └── Skills.jsx             # Skills section
│   ├── hooks/
│   │   ├── use3DAnimation.js      # Custom 3D animation hooks
│   │   ├── useScrollAnimation.js  # GSAP scroll animations
│   │   └── useWindowSize.js       # Window size hook
│   ├── utils/
│   │   ├── constants.js           # Data and configuration
│   │   └── helpers.js             # Helper functions
│   ├── App.jsx                    # Main app component
│   ├── main.jsx                   # Entry point
│   └── index.css                  # Global styles
├── public/                        # Static assets
├── index.html                     # HTML template
├── package.json                   # Dependencies
├── tailwind.config.js             # Tailwind configuration
├── postcss.config.js              # PostCSS configuration
└── vite.config.js                 # Vite configuration
```

## 🎨 Customization

### Colors
Edit `tailwind.config.js` to change the color scheme:
```javascript
colors: {
  primary: {
    // Your custom colors
  }
}
```

### 3D Models
- Replace models in `src/components/Canvas/Models.jsx`
- Import custom GLTF models using `@react-three/drei`'s `useGLTF` hook

### Content
Update `src/utils/constants.js`:
- Personal information
- Projects data
- Skills and proficiency levels
- Work experience
- Social media links

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 📱 Responsive Design

The portfolio is fully responsive with breakpoints:
- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

## ⚡ Performance

- **Lazy loading** - 3D models and images
- **Code splitting** - Optimized bundle size
- **Memoization** - React.memo for expensive components
- **Debouncing** - Scroll and resize events
- **WebGL optimization** - Efficient 3D rendering

## 🌟 Features to Add

- [ ] Dark/Light theme toggle
- [ ] Blog section with MDX
- [ ] Project filtering and search
- [ ] Animated cursor
- [ ] Loading progress bar
- [ ] Sound effects
- [ ] AR experiences
- [ ] Multiple language support

## 🐛 Known Issues

- Some 3D effects may not work on older browsers
- Mobile performance may vary on low-end devices
- Safari may have WebGL compatibility issues

## 📄 License

MIT License - feel free to use this template for your own portfolio!

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## 💬 Support

If you have any questions or need help, feel free to reach out:
- Email: your.email@example.com
- Twitter: [@yourusername](https://twitter.com/yourusername)
- LinkedIn: [Your Name](https://linkedin.com/in/yourusername)

## ⭐ Show your support

Give a ⭐️ if you like this project!

---

Made with ❤️ using React, Three.js, and lots of coffee ☕
# Portfolio
# genxsys-task-4
