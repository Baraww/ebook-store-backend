// routes/api/books.js
const express = require('express');
const router = express.Router();
const auth = require('../../middleware/authMiddleware');
const admin = require('../../middleware/adminMiddleware');
const Book = require('../../models/Book');

// @route   GET /api/books
// @desc    Get all books
router.get('/', async (req, res) => { /* ... (your existing code) ... */ });

// CORRECT ORDER: The specific '/search' route comes BEFORE the generic '/:id' route.
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
router.get('/:id', async (req, res) => { /* ... (your existing code) ... */ });

// @route   POST /api/books
// @desc    Add a new book
router.post('/', [auth, admin], async (req, res) => { /* ... (your existing code) ... */ });

// @route   PUT /api/books/:id
// @desc    Update a book
router.put('/:id', [auth, admin], async (req, res) => { /* ... (your existing code) ... */ });

// @route   DELETE /api/books/:id
// @desc    Delete a book
router.delete('/:id', [auth, admin], async (req, res) => { /* ... (your existing code) ... */ });

module.exports = router;