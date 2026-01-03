# 🔌 API Testing Examples

## Using cURL

### Test SMTP Connection
```bash
curl -X POST http://localhost:5000/api/email/test
```

**Expected Response:**
```json
{
  "success": true,
  "message": "✅ Test email sent successfully! Check your inbox."
}
```

---

### Send Contact Email
```bash
curl -X POST http://localhost:5000/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "subject": "Internship Inquiry",
    "message": "Hi, I'm interested in discussing internship opportunities with your company. I have experience in full-stack development and would love to learn more."
  }'
```

**Expected Response:**
```json
{
  "success": true,
  "message": "Email sent successfully! I will get back to you soon."
}
```

---

### Error Example - Missing Fields
```bash
curl -X POST http://localhost:5000/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com"
  }'
```

**Response:**
```json
{
  "success": false,
  "message": "All fields are required"
}
```

---

### Error Example - Invalid Email
```bash
curl -X POST http://localhost:5000/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "invalid-email",
    "subject": "Test",
    "message": "This is a test message"
  }'
```

**Response:**
```json
{
  "success": false,
  "message": "Invalid email format"
}
```

---

### Error Example - Message Too Short
```bash
curl -X POST http://localhost:5000/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "subject": "Test",
    "message": "Hi"
  }'
```

**Response:**
```json
{
  "success": false,
  "message": "Message must be at least 10 characters"
}
```

---

## Using Postman

### 1. Create New Request
- Method: `POST`
- URL: `http://localhost:5000/api/contact`

### 2. Set Headers
```
Content-Type: application/json
```

### 3. Set Body (JSON)
```json
{
  "name": "Jane Smith",
  "email": "jane@example.com",
  "subject": "Project Collaboration",
  "message": "I saw your portfolio and I'm impressed by your work. Would you be interested in collaborating on a project?"
}
```

### 4. Send & View Response

---

## Using JavaScript/Fetch

### Send Contact Email
```javascript
const sendContactEmail = async () => {
  try {
    const response = await fetch('http://localhost:5000/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: 'Alex Johnson',
        email: 'alex@example.com',
        subject: 'Portfolio Feedback',
        message: 'Your portfolio is amazing! The 3D elements are particularly impressive. Great work!'
      })
    });

    const result = await response.json();
    console.log(result);
    
    if (result.success) {
      console.log('✅ Email sent successfully!');
    } else {
      console.log('❌ Error:', result.message);
    }
  } catch (error) {
    console.error('Network error:', error);
  }
};

// Call the function
sendContactEmail();
```

---

## Using Python

### Send Contact Email
```python
import requests
import json

url = "http://localhost:5000/api/contact"

payload = {
    "name": "Sarah Chen",
    "email": "sarah@example.com",
    "subject": "Freelance Opportunity",
    "message": "I have an exciting freelance project that aligns perfectly with your skills. Would you be interested in discussing this opportunity?"
}

headers = {
    "Content-Type": "application/json"
}

response = requests.post(url, data=json.dumps(payload), headers=headers)
result = response.json()

print(result)
# Output: {'success': True, 'message': 'Email sent successfully! I will get back to you soon.'}
```

---

## Using Node.js

### Send Contact Email
```javascript
const axios = require('axios');

const sendEmail = async () => {
  try {
    const response = await axios.post('http://localhost:5000/api/contact', {
      name: 'Mike Wilson',
      email: 'mike@example.com',
      subject: 'Business Partnership',
      message: 'I believe our companies could have a great partnership. Let\'s discuss this further.'
    });

    console.log('✅ Success:', response.data.message);
  } catch (error) {
    console.error('❌ Error:', error.response.data.message);
  }
};

sendEmail();
```

---

## Expected Email Results

### Admin Email Received
```
From: Mike Wilson <mike@example.com>
To: your-email@gmail.com
Subject: New Contact Form Submission: Business Partnership

---

📨 New Contact Form Submission

From: Mike Wilson
Email: mike@example.com
Subject: Business Partnership

Message:
I believe our companies could have a great partnership. Let's discuss this further.

---
This email was sent from your portfolio website contact form.
```

### Confirmation Email Sent to Visitor
```
From: Your Name <your-email@gmail.com>
To: mike@example.com
Subject: ✅ Thank you for reaching out!

---

✅ Thank You, Mike!

Thanks for getting in touch. I've received your message and will get back to you as soon as possible.

Your Message:
I believe our companies could have a great partnership. Let's discuss this further.

⏱️ I typically respond within 24-48 hours.

Best regards,
Your Name
```

---

## Batch Testing Script

### test-emails.sh
```bash
#!/bin/bash

echo "🧪 Testing Portfolio Email API"
echo "=============================="

# Test 1: Health Check
echo -e "\n1️⃣ Health Check:"
curl -s http://localhost:5000/api/health | jq .

# Test 2: SMTP Test
echo -e "\n2️⃣ SMTP Test:"
curl -s -X POST http://localhost:5000/api/email/test | jq .

# Test 3: Valid Contact Email
echo -e "\n3️⃣ Valid Contact Email:"
curl -s -X POST http://localhost:5000/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "subject": "Test Email",
    "message": "This is a test message from the API testing script."
  }' | jq .

# Test 4: Missing Fields
echo -e "\n4️⃣ Missing Fields Error:"
curl -s -X POST http://localhost:5000/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User"
  }' | jq .

# Test 5: Invalid Email
echo -e "\n5️⃣ Invalid Email Error:"
curl -s -X POST http://localhost:5000/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "invalid",
    "subject": "Test",
    "message": "This is a test message"
  }' | jq .

echo -e "\n✅ All tests completed!"
```

### Run the test:
```bash
chmod +x test-emails.sh
./test-emails.sh
```

---

## Common Response Status Codes

| Code | Meaning | Example |
|------|---------|---------|
| 200 | Success | Email sent successfully |
| 400 | Bad Request | Missing fields, invalid email |
| 500 | Server Error | SMTP connection failed |

---

## Debugging Tips

### 1. Check Backend Logs
Watch terminal running `npm run server` for detailed error messages.

### 2. Test SMTP Connection
```bash
curl -X POST http://localhost:5000/api/email/test
```

### 3. Verify Environment Variables
```bash
# Check .env.local is in root directory
ls -la .env.local

# Verify contents (don't commit this!)
cat .env.local
```

### 4. Check Network Connectivity
```bash
# Test if backend is running
curl http://localhost:5000/api/health
```

### 5. Browser DevTools
- Open DevTools (F12)
- Go to Network tab
- Submit contact form
- Inspect request/response

---

## Load Testing Example

### Using Apache Bench (ab)
```bash
# Single request
ab -n 1 -c 1 -p payload.json -T application/json http://localhost:5000/api/contact

# Multiple requests (test rate limiting)
ab -n 100 -c 10 -p payload.json -T application/json http://localhost:5000/api/contact
```

### Using Artillery
```yaml
# load-test.yml
config:
  target: "http://localhost:5000"
  phases:
    - duration: 60
      arrivalRate: 5

scenarios:
  - name: "Contact Form"
    flow:
      - post:
          url: "/api/contact"
          json:
            name: "Load Test User"
            email: "loadtest@example.com"
            subject: "Load Test"
            message: "This is a load test message for the contact form."
```

Run with:
```bash
npm install -g artillery
artillery run load-test.yml
```

---

**Happy Testing!** 🚀
