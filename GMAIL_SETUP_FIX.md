# 🔧 Gmail App Password Fix

## ⚠️ Your Current Password is Invalid

The password in `.env.local` is missing spaces and may be incorrect:
```
SMTP_PASS=zwry qmtehfkcldiw  ❌ (Invalid - no spaces)
```

Gmail app passwords must have spaces:
```
SMTP_PASS=zwry qmte hfkc ldiw  ✅ (Correct format)
```

## 🔐 How to Fix

### Step 1: Regenerate Gmail App Password
1. Go to: https://myaccount.google.com/apppasswords
2. **Delete the old password** (the one you used previously)
3. **Generate a NEW password**:
   - Select: **Mail** and **Windows Computer** (or your OS)
   - Click **Generate**
4. Google will show: `xxxx xxxx xxxx xxxx` (16 chars with spaces)
5. **Copy the entire password WITH SPACES**

### Step 2: Update .env.local

Replace the old password with the new one:

```dotenv
# Before (Invalid - no spaces)
SMTP_PASS=zwry qmtehfkcldiw

# After (Correct - copy with spaces)
SMTP_PASS=xxxx xxxx xxxx xxxx
```

### Step 3: Verify Format

Your `.env.local` should look like:
```dotenv
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=meticura@gmail.com
SMTP_PASS=xxxx xxxx xxxx xxxx    ← Must have spaces!
SMTP_FROM_EMAIL=meticura@gmail.com
SMTP_FROM_NAME=Portfolio Website
CONTACT_RECIPIENT_EMAIL=vishalsodmise@gmail.com
```

### Step 4: Restart Backend Server

Stop the running server and restart:
```bash
node server/index.js
```

You should now see:
```
✅ SMTP Server Connected and Ready for Sending Emails
```

### Step 5: Test Email

Submit the contact form or run:
```bash
curl -X POST http://localhost:5000/api/email/test
```

## 🐛 If Still Not Working

**Common Issues:**

1. **"connect ECONNREFUSED 127.0.0.1:587"**
   - ❌ Wrong: Spaces removed from password
   - ❌ Wrong: Invalid password
   - ✅ Fix: Regenerate password WITH spaces

2. **"Invalid login"**
   - ❌ Wrong: Email address typo
   - ❌ Wrong: 2FA not enabled on Gmail
   - ✅ Fix: Go to myaccount.google.com/security and enable 2FA

3. **"Authentication failed"**
   - ❌ Wrong: Using regular Gmail password instead of app password
   - ✅ Fix: Use app-specific password from apppasswords page

## ✅ Success Indicators

When configured correctly, you'll see:

**Backend Startup:**
```
🔧 SMTP Configuration:
   Host: smtp.gmail.com
   Port: 587
   User: ✓ Set
   Pass: ✓ Set
✅ SMTP Server Connected and Ready for Sending Emails
```

**Form Submission:**
```
200 OK - "Email sent successfully!"
+ 2 emails received (admin + confirmation)
```

**Test Endpoint:**
```bash
curl -X POST http://localhost:5000/api/email/test
# Response: {"success":true,"message":"✅ Test email sent successfully! Check your inbox."}
```
