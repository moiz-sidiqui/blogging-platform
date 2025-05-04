const express = require('express');
const router = express.Router();
const { postBlog } = require('../controllers/postBlogController');

// Route to handle post Blog requests
router.post('/postblog', postBlog);

module.exports = router;