const express = require('express');
const { submitContact } = require('../controllers/contactController');
const { contactLimiter } = require('../middleware/rateLimiter');

const router = express.Router();

// POST /api/contact - Submit contact inquiry with rate limiting
router.post('/', contactLimiter, submitContact);

module.exports = router;
