const express = require('express');
const router = express.Router();
const { Feedback } = require('../controllers/feedbackController');

// Route to handle post Blog requests
router.post('/feedback', Feedback);

module.exports = router;