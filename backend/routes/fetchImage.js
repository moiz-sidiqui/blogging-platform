// fetchImageRoute.js

const express = require('express');
const router = express.Router();
const { fetchImage } = require('../controllers/fetchImageController');

// Route to handle fetching images
router.get('/fetchImage', fetchImage);

module.exports = router;
