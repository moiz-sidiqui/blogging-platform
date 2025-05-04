const Blog = require('../models/Blog');


exports.postBlog = async (req, res) => {
  const { title, category, description, time, user , userImage} = req.body;
  let imagePath = '';

  // Check if a file is uploaded
  if (req.file) {
    imagePath = req.file.path;
  }

  try {
    // Create a new blog document
    const newBlog = new Blog({ title, category, description, time, user, userImage, image: imagePath });
    
    // Save the blog document to the database
    await newBlog.save();

    res.status(201).json({ message: 'Blog posted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};
