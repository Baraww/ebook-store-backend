// models/Book.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create the schema (the blueprint for a book)
const BookSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  coverImage: {
    type: String, // We'll store a URL to the image
    required: false
  },
  dateAdded: {
    type: Date,
    default: Date.now
  }
});

// Create and export the model
// This line is crucial for other files to be able to use this model
module.exports = mongoose.model('Book', BookSchema);