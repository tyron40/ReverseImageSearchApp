const express = require('express');
const { ImageAnnotatorClient } = require('@google-cloud/vision');
const multer = require('multer');
const fs = require('fs');

const app = express();
const port = 3000;

// Initialize the Google Cloud Vision client
const client = new ImageAnnotatorClient({
  keyFilename: 'path/to/your/credentials.json', // Path to the JSON key file you downloaded
});

// Set up Multer for handling file uploads
const upload = multer({ dest: 'uploads/' });

app.use(express.json());

// Endpoint for reverse image search
app.post('/search', upload.single('image'), async (req, res) => {
  try {
    // Read the uploaded image
    const image = await fs.promises.readFile(req.file.path);

    // Make a request to Google Cloud Vision API for label detection
    const [result] = await client.labelDetection(image);

    // Extract labels from the response
    const labels = result.labelAnnotations.map((label) => label.description);

    res.json({ labels });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'An error occurred' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
