const express = require('express');
const router = express.Router();
const { fetchBlogs } = require('../controllers/fetchBlogController');

// Route to handle login requests
router.get('/fetchblog', fetchBlogs);

module.exports = router;
