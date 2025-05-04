const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Validate password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user._id, username:user.username,userimage:user.profileImage }, 'your_secret_key', { expiresIn: '1h' });
    res.json({ token, username: user.username, userimage:user.profileImage });

  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};
