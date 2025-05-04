const express = require('express');
const authRoute = require('./routes/auth');
const SignUpRoute = require('./routes/signup');
const postBlogRoute = require('./routes/postBlog');
const fetchBlogRoute = require('./routes/fetchBlog');
const fetchImageRoute = require('./routes/fetchImage');
const feedbackRoute = require('./routes/feedback');
const cors = require('cors');
const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');

const app = express();

// Middleware
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/blogingPlatform', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

// Enable CORS for all routes
app.use(cors());

// Multer configuration for file upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Destination folder for storing uploaded files
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname)); // File naming convention
  }
});

const upload = multer({ storage: storage });

// Routes
app.use('/api/auth', authRoute);

// Route for signing up with profile image upload
app.use('/api/register', upload.single('profileImage'), SignUpRoute);

// Route for posting a blog with image upload
app.use('/api/postBlog', upload.single('image'), postBlogRoute);

app.use('/api', fetchBlogRoute);
app.use('/api', fetchImageRoute);
app.use('/api', feedbackRoute);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Start the server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
