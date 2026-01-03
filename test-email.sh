#!/bin/bash
# Email Configuration Test Script

echo "========================================="
echo "🧪 Portfolio Email Configuration Tester"
echo "========================================="
echo ""

# Check if .env.local exists
if [ ! -f .env.local ]; then
    echo "❌ .env.local file not found!"
    echo "📝 Please create .env.local with SMTP credentials"
    exit 1
fi

echo "✅ .env.local found"
echo ""

# Check if node_modules exists
if [ ! -d node_modules ]; then
    echo "📦 Installing dependencies..."
    npm install
fi

echo "✅ Dependencies installed"
echo ""

# Check if servers are running
echo "🚀 Starting backend server..."
echo ""
echo "Run this in Terminal 1:"
echo "  npm run dev"
echo ""
echo "Run this in Terminal 2:"
echo "  npm run server"
echo ""
echo "Then run this in Terminal 3 to test:"
echo "  curl -X POST http://localhost:5000/api/email/test"
echo ""
echo "========================================="
echo "Expected: ✅ Test email sent successfully!"
echo "Check your inbox for test email"
echo "========================================="
