const express = require('express');
const router = express.Router();
const aiController = require('../controllers/aiController');

// AI Assistant API endpoint
router.post('/ai-assistant', aiController.processAIRequest);

module.exports = router; 