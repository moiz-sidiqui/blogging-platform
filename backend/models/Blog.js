const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    title: String,
    category: String,
    description: String,
    time: String,
    user: String, 
    userImage: String,  // store path of user's image who is posting blog
    image: String, // store path of blog image
    
});

const Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;
