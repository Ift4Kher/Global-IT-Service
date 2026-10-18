const { pool } = require('../config/db');
const { validateNewsletterInput } = require('../validators/newsletterValidator');

// POST /api/newsletter
async function subscribe(req, res, next) {
  try {
    const validationResult = validateNewsletterInput(req.body);

    if (!validationResult.success) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid email address.'
      });
    }

    const { email } = validationResult.data;
    const ipAddress = req.headers['x-forwarded-for'] || req.socket.remoteAddress || '127.0.0.1';

    const sql = `
      INSERT INTO newsletter_subscribers (email, ip_address, status)
      VALUES (?, ?, 'active')
      ON DUPLICATE KEY UPDATE status = 'active'
    `;

    await pool.execute(sql, [email, ipAddress]);

    return res.status(200).json({
      success: true,
      message: 'Thank you for subscribing to Global IT insights and technology news!'
    });
  } catch (error) {
    console.error('[Newsletter Controller Error]', error.message);
    return res.status(500).json({
      success: false,
      message: 'Unable to process subscription at this time. Please try again later.'
    });
  }
}

module.exports = {
  subscribe
};
