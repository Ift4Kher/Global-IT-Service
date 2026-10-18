// Vercel Serverless Function: POST /api/newsletter
// Handles newsletter subscription

module.exports = function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  res.setHeader('Content-Type', 'application/json');

  try {
    const { email } = req.body || {};

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email.trim())) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid email address.'
      });
    }

    // Log subscription (visible in Vercel function logs)
    console.log('[Newsletter Subscription]', JSON.stringify({
      email: email.trim(),
      ip: req.headers['x-forwarded-for'] || 'unknown',
      timestamp: new Date().toISOString()
    }));

    return res.status(200).json({
      success: true,
      message: 'Thank you for subscribing to Global IT insights and technology news!'
    });

  } catch (error) {
    console.error('[Newsletter Error]', error.message);
    return res.status(500).json({
      success: false,
      message: 'Unable to process subscription at this time. Please try again later.'
    });
  }
};
