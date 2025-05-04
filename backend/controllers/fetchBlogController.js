const Blog = require('../models/Blog');

exports.fetchBlogs = async (req, res) => {
  try {
    // Fetch all blogs from the database
    const blogs = await Blog.find();
    
    // If no blogs found, send an appropriate response
    if (!blogs || blogs.length === 0) {
      return res.status(404).json({ error: 'No blogs found' });
    }

    // If blogs found, send them as response
    res.json(blogs);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};
