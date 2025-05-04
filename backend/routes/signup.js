// signup.js

const express = require('express');
const router = express.Router();
const { signUp } = require('../controllers/signUpController');

// Route to handle signUp requests
router.post('/signUp', signUp);

module.exports = router;
