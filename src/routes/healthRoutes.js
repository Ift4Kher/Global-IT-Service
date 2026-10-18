const express = require('express');
const { testConnection } = require('../config/db');

const router = express.Router();

router.get('/health', async (req, res) => {
  const dbStatus = await testConnection();

  res.status(200).json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || 'development',
    database: {
      connected: dbStatus,
      type: 'MySQL'
    }
  });
});

module.exports = router;
