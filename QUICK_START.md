# 🚀 Email Setup Quick Checklist

## Step 1: Gmail Configuration (2 minutes)
- [ ] Go to https://myaccount.google.com
- [ ] Enable 2-Factor Authentication
- [ ] Generate App-Specific Password (16 characters)
- [ ] Copy the password

## Step 2: Environment Setup (1 minute)
- [ ] Open `.env.local`
- [ ] Add SMTP credentials:
```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=<your-16-char-password>
SMTP_FROM_EMAIL=your-email@gmail.com
SMTP_FROM_NAME=Your Name
CONTACT_RECIPIENT_EMAIL=your-email@gmail.com
VITE_API_URL=http://localhost:5000
```

## Step 3: Install Dependencies (2 minutes)
```bash
npm install
```

## Step 4: Run Servers (1 minute)

**Terminal 1:**
```bash
npm run dev
```

**Terminal 2:**
```bash
npm run server
```

## Step 5: Test (1 minute)

**Test SMTP Connection:**
```bash
curl -X POST http://localhost:5000/api/email/test
```

**Check your email inbox for test email ✓**

## Step 6: Test Contact Form (2 minutes)
- [ ] Go to http://localhost:5173
- [ ] Scroll to Contact section
- [ ] Fill form and submit
- [ ] Receive 2 emails (admin + confirmation)

---

## 🎯 Expected Results

✅ Admin Email received with:
- Visitor's name and email
- Subject and full message
- Formatted with purple gradient header

✅ Confirmation Email received:
- Thanks for reaching out
- Echo of the message
- Response time estimate (24-48 hours)

---

## 📁 Files Created/Modified

**New Files:**
- `server/index.js` - Express server
- `server/routes/email.js` - Email logic
- `.env.local` - Configuration

**Modified Files:**
- `src/components/Contact.jsx` - Backend integration
- `package.json` - Dependencies & scripts

---

## 🆘 Quick Troubleshooting

| Issue | Solution |
|-------|----------|
| Module not found | `npm install nodemailer express cors dotenv` |
| SMTP error | Check credentials in `.env.local` |
| CORS error | Ensure backend running on port 5000 |
| No email received | Check spam folder, verify SMTP_PASS is app-specific |
| Form not submitting | Check console, verify servers both running |

---

## 📞 Commands Reference

```bash
# Development
npm run dev              # Frontend only
npm run server          # Backend only  
npm run dev:all         # Both (if concurrently installed)

# Testing
curl -X POST http://localhost:5000/api/email/test

# Production
npm run build           # Build frontend
```

---

**You're all set! 🎉 Start sending emails from your contact form.**
