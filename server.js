
// server.js (Final version for this step)
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // 1. Import cors
const { mongoURI } = require('./config');

const app = express();
const PORT = 5000;
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

