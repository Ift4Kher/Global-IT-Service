const { pool } = require('../config/db');
const { validateContactInput } = require('../validators/contactValidator');

// POST /api/contact
async function submitContact(req, res, next) {
  try {
    // 1. Validation with Zod
    const validationResult = validateContactInput(req.body);

    if (!validationResult.success) {
      const issues = validationResult.error.issues || validationResult.error.errors || [];
      const formattedErrors = issues.map(err => ({
        field: err.path.join('.'),
        message: err.message
      }));

      return res.status(400).json({
        success: false,
        message: 'Validation failed. Please correct the highlighted fields.',
        errors: formattedErrors
      });
    }

    const { name, email, company, phone, service_interest, message, website_hp } = validationResult.data;

    // 2. Honeypot check for spam bots
    if (website_hp && website_hp.trim().length > 0) {
      console.warn(`[Spam Blocked] Honeypot triggered from IP: ${req.ip}`);
      // Return synthetic success to discourage bot retries
      return res.status(200).json({
        success: true,
        message: 'Thank you for reaching out. Your message has been received, and our team will get back to you shortly.'
      });
    }

    // 3. Client metadata
    const ipAddress = req.headers['x-forwarded-for'] || req.socket.remoteAddress || '127.0.0.1';
    const userAgent = (req.headers['user-agent'] || '').substring(0, 255);

    // 4. Parameterized MySQL Insertion
    const insertSql = `
      INSERT INTO contact_inquiries (name, email, company, phone, service_interest, message, ip_address, user_agent, status)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'new')
    `;

    const values = [
      name,
      email,
      company || null,
      phone || null,
      service_interest || null,
      message,
      ipAddress,
      userAgent
    ];

    const [result] = await pool.execute(insertSql, values);

    return res.status(201).json({
      success: true,
      message: 'Thank you for reaching out! Your inquiry has been received. Our team will contact you within 24 hours.',
      inquiryId: result.insertId
    });

  } catch (error) {
    console.error('[Contact Submission Error]', error.message);
    return res.status(500).json({
      success: false,
      message: 'An unexpected error occurred while processing your request. Please try again or reach out to us directly at info@globalit.technology.'
    });
  }
}

module.exports = {
  submitContact
};
