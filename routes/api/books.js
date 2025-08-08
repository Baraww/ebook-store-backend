// routes/api/books.js
console.log('--- The latest version of books.js is loading! ---');

const express = require('express');
const router = express.Router();
const auth = require('../../middleware/authMiddleware');
const admin = require('../../middleware/adminMiddleware');
const Book = require('../../models/Book');

// @route   GET /api/books
// @desc    Get all books
router.get('/', async (req, res) => {
  try {
    const books = await Book.find().sort({ dateAdded: -1 });
    res.json(books);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
});

// Add this to routes/api/books.js

// @route   GET /api/books/:id
// @desc    Get a single book by ID
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }
    res.json(book);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST /api/books
// @desc    Add a new book
router.post('/', [auth, admin], async (req, res) => {
  const newBook = new Book({
    title: req.body.title,
    author: req.body.author,
    description: req.body.description,
    price: req.body.price,
    coverImage: req.body.coverImage
  });

  try {
    const book = await newBook.save();
    res.status(201).json(book);
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: err.message });
  }
});

// @route   DELETE /api/books/:id
// @desc    Delete a book
// THIS IS THE FIX: The DELETE route is now correctly placed on its own.
router.delete('/:id', [auth, admin], async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);

    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }

    await Book.findByIdAndDelete(req.params.id);

    res.json({ message: 'Book removed successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Add this to routes/api/books.js

// @route   PUT /api/books/:id
// @desc    Update a book
// @access  Private (Admin only)
router.put('/:id', [auth, admin], async (req, res) => {
  try {
    const { title, author, description, price, coverImage } = req.body;

    // Find the book by its ID and update it with the new data
    // { new: true } ensures that the updated document is returned
    const updatedBook = await Book.findByIdAndUpdate(
      req.params.id,
      { title, author, description, price, coverImage },
      { new: true }
    );

    if (!updatedBook) {
      return res.status(404).json({ message: 'Book not found' });
    }

    res.json(updatedBook);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});
module.exports = router;