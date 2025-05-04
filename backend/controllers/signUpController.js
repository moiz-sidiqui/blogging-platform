const bcrypt = require('bcrypt');
const User = require('../models/User');

exports.signUp = async (req, res) => {
  const { username, email, password } = req.body;
  let imagePath = '';

  // Check if a file is uploaded
  if (req.file) {
    imagePath = req.file.path;
  }

  try {
    // Check if the username or email already exists
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res.status(400).json({ message: 'Username or email already exists', success: false });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user document with hashed password
    const newUser = new User({ username, email, password: hashedPassword, profileImage: imagePath });
    
    // Save the user document to the database
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully', success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error', success: false });
  }
};
