// routes/api/dashboard.js
const express = require('express');
const router = express.Router();
const auth = require('../../middleware/authMiddleware');
const admin = require('../../middleware/adminMiddleware');
const User = require('../../models/User');
const Book = require('../../models/Book');

// @route   GET /api/dashboard/stats
// @desc    Get key statistics for the admin dashboard
// @access  Private (Admin only)
router.get('/stats', [auth, admin], async (req, res) => {
  try {
    // Use countDocuments() to efficiently get the total count for each collection
    const userCount = await User.countDocuments();
    const bookCount = await Book.countDocuments();

    // We can add more stats here in the future (e.g., total orders, revenue)

    res.json({
      users: userCount,
      books: bookCount,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;