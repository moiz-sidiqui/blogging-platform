const path = require('path');
const fs = require('fs');

// Function to fetch and serve images
exports.fetchImage = async (req, res) => {
    const imagePath = req.query.path;
    if (!imagePath) {
        return res.status(400).json({ error: 'Image path is required' });
    }
    // Remove "uploads/" from the imagePath
    const cleanedImagePath = imagePath.replace('uploads/', '');
    // Construct the absolute path to the image file
    const absolutePath = path.join(__dirname, '..','uploads', cleanedImagePath);
    // Check if the file exists
    if (!fs.existsSync(absolutePath)) {
        return res.status(404).json({ error: 'Image not found' });
    }
    // Send the image file
    res.sendFile(absolutePath);
};
