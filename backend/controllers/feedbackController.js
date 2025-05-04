const Feedback = require('../models/Feedback');


exports.Feedback = async (req, res) => {
  const { name, email, message} = req.body;
 

  
  try {
    // Create a new feedback document
    const newFeedback = new Feedback({name,email,message});
    
    // Save the feedback document to the database
    await newFeedback.save();

    res.status(201).json({ message: 'Feedback saved successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};
