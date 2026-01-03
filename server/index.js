import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { sendContactEmail, sendTestEmail } from './routes/email.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const envPath = join(__dirname, '..', '.env.local');
const isProd = process.env.NODE_ENV === 'production';

// Load environment variables from .env.local (or .env as fallback)
dotenv.config({ path: envPath });
dotenv.config({ path: join(__dirname, '..', '.env') });

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

// CORS configuration tuned for Vercel deployments
const vercelDomain = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : null;

const defaultOrigins = [
  'http://localhost:5173',
  'http://localhost:3000',
  'https://localhost:3000',
  'https://localhost:5173',
  'https://vishalsodmise.vercel.app',
].filter(Boolean);

// Allow comma-separated origins in CORS_ORIGINS or CLIENT_URL
const envOrigins = (process.env.CORS_ORIGINS || process.env.CLIENT_URL || vercelDomain || '')
  .split(',')
  .map((o) => o.trim())
  .filter(Boolean);

// Allow any *.vercel.app by default for preview deployments
const corsOptions = {
  origin: (origin, callback) => {
    if (!origin) return callback(null, true); // allow same-origin / curl
    const allowed = [...defaultOrigins, ...envOrigins];
    const isWhitelisted = allowed.includes(origin) || /\.vercel\.app$/.test(origin);
    callback(isWhitelisted ? null : new Error('Not allowed by CORS'), isWhitelisted);
  },
  credentials: true,
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type'],
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions));

// Request logging middleware (disabled in production)
if (!isProd) {
  app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
    next();
  });
}

// ================== API Routes ==================

/**
 * POST /api/contact
 * Handle contact form submissions
 */
app.post('/api/contact', sendContactEmail);

/**
 * POST /api/email/test
 * Test SMTP configuration
 */
app.post('/api/email/test', sendTestEmail);

/**
 * GET /api/health
 * Health check endpoint
 */
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    message: 'Server is running',
    timestamp: new Date().toISOString(),
  });
});

/**
 * GET /
 * Root endpoint
 */
app.get('/', (req, res) => {
  res.json({
    name: 'Portfolio Email Service',
    version: '1.0.0',
    endpoints: {
      contact: 'POST /api/contact',
      health: 'GET /api/health',
      test: 'POST /api/email/test',
    },
  });
});

// ================== Error Handling ==================

/**
 * 404 Not Found
 */
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Endpoint not found',
    path: req.path,
  });
});

/**
 * Global Error Handler
 */
app.use((err, req, res, next) => {
  if (!isProd) {
    console.error('❌ Error:', err.message);
  }
  res.status(err.status || 500).json({
    success: false,
    message: process.env.NODE_ENV === 'development' 
      ? err.message 
      : 'Internal server error',
  });
});

// ================== Server Start ==================

app.listen(PORT, () => {
  if (!isProd) {
    const clientUrl = process.env.CLIENT_URL || 'http://localhost:5173';
    const envName = process.env.NODE_ENV || 'development';
    console.log(`
╔════════════════════════════════════════╗
║   📧 Portfolio Email Service Started   ║
╠════════════════════════════════════════╣
║ Server: http://localhost:${PORT}
║ Environment: ${envName}
║ CORS Origin: ${clientUrl}
╚════════════════════════════════════════╝
    `);
  }
});

export default app;
