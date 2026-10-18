const express = require('express');
const { subscribe } = require('../controllers/newsletterController');
const { newsletterLimiter } = require('../middleware/rateLimiter');

const router = express.Router();

// POST /api/newsletter - Subscribe with rate limiting
router.post('/', newsletterLimiter, subscribe);

module.exports = router;
