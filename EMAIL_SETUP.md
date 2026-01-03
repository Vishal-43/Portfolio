# 📧 Portfolio Email Setup Guide

## Quick Start (5 minutes)

### 1. Install Dependencies
```bash
npm install
```

This installs:
- `nodemailer` - Email sending library
- `express` - Backend server
- `cors` - Cross-origin requests
- `dotenv` - Environment variable management

### 2. Configure Email (.env.local)

**For Gmail:**
1. Go to [myaccount.google.com](https://myaccount.google.com)
2. Enable 2-Factor Authentication (Security tab)
3. Generate App-Specific Password:
   - Click "App passwords"
   - Select "Mail" and "Windows Computer"
   - Copy the 16-character password
4. Update `.env.local`:
```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-16-char-password
SMTP_FROM_EMAIL=your-email@gmail.com
SMTP_FROM_NAME=Your Name
CONTACT_RECIPIENT_EMAIL=your-email@gmail.com
```

**For Other Providers:**
- **Outlook/Hotmail:** `smtp-mail.outlook.com:587`
- **SendGrid:** `smtp.sendgrid.net:587` (username: `apikey`)
- **Mailtrap:** `smtp.mailtrap.io:587`
- **AWS SES:** `email-smtp.[region].amazonaws.com:587`

### 3. Run Development Servers

**Terminal 1 - Frontend:**
```bash
npm run dev
```
Runs on: http://localhost:5173

**Terminal 2 - Backend:**
```bash
npm run server
```
Runs on: http://localhost:5000

**Both at once (if concurrently is installed):**
```bash
npm run dev:all
```

### 4. Test Email Configuration

**Option A: Test Endpoint**
```bash
curl -X POST http://localhost:5000/api/email/test
```

**Option B: Use Contact Form**
- Visit http://localhost:5173
- Fill contact form and submit
- Check your email inbox

### 5. Verify Emails Received

You should receive 2 emails:
1. **Admin Email** - Contains the visitor's message
2. **Confirmation Email** - Sent to visitor confirming receipt

---

## File Structure

```
portfolio/
├── .env.local                 # ← Add your SMTP credentials here
├── server/
│   ├── index.js               # Express server & routes
│   └── routes/
│       └── email.js           # Email sending logic
├── src/
│   └── components/
│       └── Contact.jsx        # Updated to use backend API
└── package.json               # Added server dependencies
```

---

## API Endpoints

### POST /api/contact
Send contact form email
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "subject": "Inquiry",
  "message": "Hello, I'm interested in working with you..."
}
```

**Success Response:**
```json
{
  "success": true,
  "message": "Email sent successfully! I will get back to you soon."
}
```

### POST /api/email/test
Test SMTP configuration
```bash
curl -X POST http://localhost:5000/api/email/test
```

### GET /api/health
Server health check
```bash
curl http://localhost:5000/api/health
```

---

## Environment Variables

| Variable | Example | Description |
|----------|---------|-------------|
| `VITE_API_URL` | `http://localhost:5000` | Backend URL (frontend can access) |
| `PORT` | `5000` | Server port |
| `NODE_ENV` | `development` | Environment mode |
| `CLIENT_URL` | `http://localhost:5173` | Frontend URL for CORS |
| `SMTP_HOST` | `smtp.gmail.com` | Email server address |
| `SMTP_PORT` | `587` | SMTP port (587 for TLS, 465 for SSL) |
| `SMTP_USER` | `your-email@gmail.com` | SMTP username |
| `SMTP_PASS` | `abcd efgh ijkl mnop` | SMTP password (app-specific for Gmail) |
| `SMTP_FROM_EMAIL` | `your-email@gmail.com` | From email address |
| `SMTP_FROM_NAME` | `Your Name` | From display name |
| `CONTACT_RECIPIENT_EMAIL` | `your-email@gmail.com` | Where to receive form submissions |

---

## Email Templates

### Admin Email
```
From: Visitor's Name <visitor@email.com>
Subject: New Contact Form Submission: [Subject]

Contains:
- Visitor's name, email, and message
- Reply-To set to visitor's email
- Beautiful HTML formatting
```

### Confirmation Email
```
From: Your Name <your-email@gmail.com>
To: Visitor's Email
Subject: ✅ Thank you for reaching out!

Contains:
- Confirmation that message was received
- Echo of their message
- Response time estimate (24-48 hours)
```

---

## Troubleshooting

### ❌ "Module not found: nodemailer"
```bash
npm install nodemailer express cors dotenv
```

### ❌ "SMTP Connection Error"
- Check `.env.local` has correct credentials
- Verify Gmail 2FA is enabled
- Ensure app-specific password (not regular password)
- Test with: `curl -X POST http://localhost:5000/api/email/test`

### ❌ "CORS Error"
- Ensure backend server is running (`npm run server`)
- Check `VITE_API_URL` is set correctly in `.env.local`
- Verify `CLIENT_URL` in backend `.env.local`

### ❌ "Network error on contact form"
- Check both servers are running
- Verify ports: Frontend (5173), Backend (5000)
- Check browser console for specific error

### ❌ "Email not being sent"
- Look at server logs for error messages
- Verify SMTP credentials are correct
- Check inbox spam/promotions folder
- Try sending test email: `npm run test:email`

### ✅ "Email sent but arrives in spam"
- Add `noreply@` to Gmail contacts
- Configure SPF/DKIM records (for production)
- Check email template isn't flagged

---

## Production Deployment

### 1. Environment Variables
Set these on your hosting platform (Vercel, Railway, Heroku, etc.):
```
VITE_API_URL=https://your-api-domain.com
PORT=5000
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
SMTP_FROM_EMAIL=your-email@gmail.com
SMTP_FROM_NAME=Your Name
CONTACT_RECIPIENT_EMAIL=your-email@gmail.com
CLIENT_URL=https://your-portfolio.com
NODE_ENV=production
```

### 2. Update CORS
In `server/index.js`, CORS is configured from `CLIENT_URL` env variable. Update it for production.

### 3. Backend Deployment
- **Vercel:** Add `server/index.js` as API route
- **Railway:** Deploy with `npm run server`
- **Heroku:** Deploy with Procfile: `web: npm run server`
- **Docker:** Create Dockerfile with `node:18` base image

### 4. Frontend Deployment
- Update `VITE_API_URL` to point to your backend
- Build: `npm run build`
- Deploy to Vercel/Netlify/GitHub Pages

---

## Security Best Practices

✅ **DO:**
- Store credentials in `.env.local` (never commit)
- Use app-specific passwords for Gmail
- Validate inputs on backend
- Enable rate limiting in production
- Use HTTPS in production
- Add CSRF protection

❌ **DON'T:**
- Commit `.env.local` to GitHub
- Use regular Gmail password
- Expose error details to frontend in production
- Send unlimited emails (add rate limiting)
- Store passwords in code

---

## Advanced Configuration

### Rate Limiting (Optional)
Install `express-rate-limit`:
```bash
npm install express-rate-limit
```

Add to `server/index.js`:
```javascript
import rateLimit from 'express-rate-limit';

const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // 5 requests per 15 min
  message: 'Too many contact attempts, please try again later',
});

app.post('/api/contact', contactLimiter, sendContactEmail);
```

### Email Logging
Add to `.env.local`:
```env
ENABLE_EMAIL_LOGS=true
```

Update `server/routes/email.js` to log emails to database if needed.

---

## Support

For issues:
1. Check server console logs
2. Verify `.env.local` configuration
3. Test SMTP with: `curl -X POST http://localhost:5000/api/email/test`
4. Check [Nodemailer Documentation](https://nodemailer.com/)

---

**Happy emailing! 📧**
