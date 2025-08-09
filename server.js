
// server.js (Final version for this step)
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // 1. Import cors
const cloudinary = require('cloudinary').v2; // 1. ADD THIS LINE
const { mongoURI } = require('./config');

const app = express();
const PORT = 5000;
// 2. ADD THIS CONFIGURATION BLOCK
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
app.use(cors()); // 2. Use cors as middleware

app.use(express.json());

mongoose.connect(mongoURI)
  .then(() => console.log('MongoDB connected successfully!'))
  .catch(err => console.log(err));

// Use the books routes
app.use('/api/books', require('./routes/api/books'));

// Use the users routes
app.use('/api/users', require('./routes/api/users'));

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

