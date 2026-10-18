const rateLimit = require('express-rate-limit');

// General API rate limiter
const apiLimiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || '900000', 10), // 15 minutes
  max: parseInt(process.env.RATE_LIMIT_MAX || '100', 10),
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Too many requests from this IP, please try again after 15 minutes.'
  }
});

// Strict rate limiter for contact form submissions to prevent spam/abuse
const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: parseInt(process.env.CONTACT_RATE_LIMIT_MAX || '10', 10),
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Submission limit reached. Please wait a few minutes before submitting another message.'
  }
});

// Newsletter subscription rate limiter
const newsletterLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Too many subscription attempts. Please try again later.'
  }
});

module.exports = {
  apiLimiter,
  contactLimiter,
  newsletterLimiter
};
