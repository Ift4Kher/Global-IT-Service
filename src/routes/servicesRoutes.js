const express = require('express');
const { getServices, getServiceBySlug } = require('../controllers/servicesController');

const router = express.Router();

// GET /api/services - Retrieve all published services
router.get('/', getServices);

// GET /api/services/:slug - Retrieve a single service by slug
router.get('/:slug', getServiceBySlug);

module.exports = router;
