// Vercel Serverless Function: GET /api/health
// Simple health check endpoint

module.exports = function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  return res.status(200).json({
    success: true,
    status: 'healthy',
    environment: 'vercel',
    timestamp: new Date().toISOString(),
    version: '1.0.0'
  });
};
