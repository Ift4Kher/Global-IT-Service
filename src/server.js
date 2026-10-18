const express = require('express');
const path = require('path');
const helmet = require('helmet');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const { testConnection } = require('./config/db');
const { apiLimiter } = require('./middleware/rateLimiter');
const { notFoundHandler, errorHandler } = require('./middleware/errorHandler');

const healthRoutes = require('./routes/healthRoutes');
const servicesRoutes = require('./routes/servicesRoutes');
const contactRoutes = require('./routes/contactRoutes');
const newsletterRoutes = require('./routes/newsletterRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// Trust proxy for reverse proxies / cPanel Passenger / Nginx
app.set('trust proxy', 1);

// HTTP Security Headers with tuned Content Security Policy
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'", "https://cdnjs.cloudflare.com", "https://unpkg.com"],
      styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com", "https://cdnjs.cloudflare.com"],
      fontSrc: ["'self'", "https://fonts.gstatic.com", "https://cdnjs.cloudflare.com"],
      imgSrc: ["'self'", "data:", "blob:", "https:"],
      connectSrc: ["'self'"],
      objectSrc: ["'none'"],
      upgradeInsecureRequests: process.env.NODE_ENV === 'production' ? [] : null
    }
  },
  crossOriginEmbedderPolicy: false
}));

// CORS Configuration
app.use(cors({
  origin: process.env.APP_URL || true,
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Payload Parsing with Strict Size Limits
app.use(express.json({ limit: '64kb' }));
app.use(express.urlencoded({ extended: true, limit: '64kb' }));

// Static Assets Serving with Cache Headers
const publicPath = path.join(__dirname, '../public');
app.use(express.static(publicPath, {
  maxAge: process.env.NODE_ENV === 'production' ? '1d' : 0,
  etag: true,
  lastModified: true
}));

// Apply general API Rate Limiting to /api/*
app.use('/api', apiLimiter);

// Register API Routes
app.use('/api', healthRoutes);
app.use('/api/services', servicesRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/newsletter', newsletterRoutes);

// Catch-all for API 404s
app.use('/api', notFoundHandler);

// Fallback to index.html for frontend root / deep service paths
app.use((req, res, next) => {
  if (req.method === 'GET' && !req.path.startsWith('/api')) {
    return res.sendFile(path.join(publicPath, 'index.html'));
  }
  next();
});

// Centralized Error Handling
app.use(errorHandler);

// Start server if executed directly (e.g., node src/server.js or npm start)
if (require.main === module) {
  app.listen(PORT, async () => {
    console.log(`[Global IT Server] Running at http://localhost:${PORT}`);
    console.log(`[Environment] ${process.env.NODE_ENV || 'development'}`);
    await testConnection();
  });
}

module.exports = app;
