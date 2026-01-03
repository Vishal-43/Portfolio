# Portfolio Deployment Guide

## Quick Deployment Options

### 1. Vercel (Recommended)

**Why Vercel?**
- Zero configuration
- Automatic HTTPS
- Global CDN
- Instant rollbacks
- Free tier available

**Steps:**

1. Install Vercel CLI:
   ```bash
   npm install -g vercel
   ```

2. Login to Vercel:
   ```bash
   vercel login
   ```

3. Deploy:
   ```bash
   vercel
   ```

4. For production:
   ```bash
   vercel --prod
   ```

**Via GitHub:**
1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click "Import Project"
4. Select your repository
5. Click "Deploy"

---

### 2. Netlify

**Steps:**

1. Install Netlify CLI:
   ```bash
   npm install -g netlify-cli
   ```

2. Build your project:
   ```bash
   npm run build
   ```

3. Deploy:
   ```bash
   netlify deploy --prod
   ```

**Via GitHub:**
1. Push to GitHub
2. Go to [netlify.com](https://netlify.com)
3. Click "New site from Git"
4. Select repository
5. Build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`

---

### 3. GitHub Pages

**Update `vite.config.js`:**
```javascript
export default defineConfig({
  base: '/your-repo-name/',
  // ... other config
})
```

**Install gh-pages:**
```bash
npm install -D gh-pages
```

**Add scripts to `package.json`:**
```json
"scripts": {
  "predeploy": "npm run build",
  "deploy": "gh-pages -d dist"
}
```

**Deploy:**
```bash
npm run deploy
```

---

### 4. AWS S3 + CloudFront

1. Build project:
   ```bash
   npm run build
   ```

2. Create S3 bucket
3. Enable static website hosting
4. Upload `dist` folder contents
5. Configure CloudFront distribution
6. Update DNS records

---

### 5. Firebase Hosting

1. Install Firebase CLI:
   ```bash
   npm install -g firebase-tools
   ```

2. Login:
   ```bash
   firebase login
   ```

3. Initialize:
   ```bash
   firebase init hosting
   ```

4. Deploy:
   ```bash
   firebase deploy
   ```

---

## Environment Variables

For production, set these environment variables:

**EmailJS:**
- `VITE_EMAILJS_SERVICE_ID`
- `VITE_EMAILJS_TEMPLATE_ID`
- `VITE_EMAILJS_PUBLIC_KEY`

**Example for Vercel:**
```bash
vercel env add VITE_EMAILJS_SERVICE_ID
vercel env add VITE_EMAILJS_TEMPLATE_ID
vercel env add VITE_EMAILJS_PUBLIC_KEY
```

---

## Custom Domain

### Vercel
1. Go to project settings
2. Click "Domains"
3. Add your custom domain
4. Update DNS records

### Netlify
1. Go to Site settings
2. Domain management
3. Add custom domain
4. Update DNS records

---

## Performance Optimization

Before deploying, ensure:

1. **Image Optimization**
   - Use WebP format
   - Compress images
   - Use lazy loading

2. **Code Splitting**
   - Already configured with Vite
   - Ensure dynamic imports where needed

3. **Caching**
   - Configure headers in hosting platform
   - Use service workers (optional)

4. **Analytics** (Optional)
   - Google Analytics
   - Vercel Analytics
   - Plausible Analytics

---

## Post-Deployment Checklist

- [ ] Test all sections and navigation
- [ ] Verify contact form works
- [ ] Check responsive design on multiple devices
- [ ] Test 3D animations performance
- [ ] Verify all links work
- [ ] Check console for errors
- [ ] Test on different browsers
- [ ] Verify SEO meta tags
- [ ] Check Lighthouse scores
- [ ] Submit to Google Search Console

---

## Monitoring

**Recommended tools:**
- Sentry - Error tracking
- LogRocket - Session replay
- Google Analytics - Traffic analysis
- Vercel Analytics - Performance monitoring

---

## Troubleshooting

**Build fails:**
- Check Node version (should be 16+)
- Clear node_modules and reinstall
- Check for missing dependencies

**3D not rendering:**
- Verify WebGL support
- Check browser console for errors
- Test on different browsers

**Contact form not working:**
- Verify EmailJS credentials
- Check environment variables
- Test with different email addresses

---

For more help, check the main README.md or open an issue on GitHub.
