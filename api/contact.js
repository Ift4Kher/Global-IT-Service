// Vercel Serverless Function: POST /api/contact
// Handles contact form submissions
// Without MySQL, stores to Vercel's /tmp (ephemeral) and logs to console

module.exports = function handler(req, res) {
  // Only allow POST
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  res.setHeader('Content-Type', 'application/json');

  try {
    const { name, email, company, service_interest, message, website_hp } = req.body || {};

    // Honeypot check
    if (website_hp && website_hp.trim().length > 0) {
      console.warn(`[Spam Blocked] Honeypot triggered from IP: ${req.headers['x-forwarded-for'] || 'unknown'}`);
      return res.status(200).json({
        success: true,
        message: 'Thank you for reaching out. Your message has been received, and our team will get back to you shortly.'
      });
    }

    // Validation
    const errors = [];

    if (!name || name.trim().length < 2) {
      errors.push({ field: 'name', message: 'Please enter your full name (at least 2 characters).' });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email.trim())) {
      errors.push({ field: 'email', message: 'Please enter a valid email address.' });
    }

    if (!message || message.trim().length < 10) {
      errors.push({ field: 'message', message: 'Please write a message of at least 10 characters.' });
    }

    if (errors.length > 0) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed. Please correct the highlighted fields.',
        errors
      });
    }

    // Log the submission (visible in Vercel function logs)
    const submission = {
      name: name.trim(),
      email: email.trim(),
      company: company ? company.trim() : null,
      service_interest: service_interest || null,
      message: message.trim(),
      ip: req.headers['x-forwarded-for'] || 'unknown',
      timestamp: new Date().toISOString()
    };

    console.log('[Contact Submission]', JSON.stringify(submission));

    return res.status(201).json({
      success: true,
      message: 'Thank you for reaching out! Your inquiry has been received. Our team will contact you within 24 hours.'
    });

  } catch (error) {
    console.error('[Contact Error]', error.message);
    return res.status(500).json({
      success: false,
      message: 'An unexpected error occurred. Please try again or contact us at info@globalit.technology.'
    });
  }
};
