// routes/api/books.js
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
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET /api/books/search
// @desc    Search for books
router.get('/search', async (req, res) => {
  try {
    const query = req.query.q;
    if (!query) return res.json([]);
    const books = await Book.find({ $text: { $search: query } });
    res.json(books);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET /api/books/:id
// @desc    Get a single book by ID
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
  try {
    const { title, author, description, price, coverImage } = req.body;
    const newBook = new Book({ title, author, description, price, coverImage });
    const book = await newBook.save();
    res.status(201).json(book);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   PUT /api/books/:id
// @desc    Update a book
router.put('/:id', [auth, admin], async (req, res) => {
  try {
    const { title, author, description, price, coverImage } = req.body;
    const updatedBook = await Book.findByIdAndUpdate(
      req.params.id,
      { title, author, description, price, coverImage },
      { new: true }
    );
    if (!updatedBook) return res.status(404).json({ message: 'Book not found' });
    res.json(updatedBook);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   DELETE /api/books/:id
// @desc    Delete a book
router.delete('/:id', [auth, admin], async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ message: 'Book not found' });
    await Book.findByIdAndDelete(req.params.id);
    res.json({ message: 'Book removed successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;