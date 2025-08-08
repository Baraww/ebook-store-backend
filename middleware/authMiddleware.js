// middleware/authMiddleware.js
const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../config');

module.exports = function (req, res, next) {
  // 1. Get token from header
  const token = req.header('x-auth-token');

  // 2. Check if no token
  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  // 3. If there is a token, verify it
  try {
    const decoded = jwt.verify(token, jwtSecret);
    // Add the user from the token's payload to the request object
    req.user = decoded.user;
    next(); // Move on to the next piece of middleware or the route handler
  } catch (err) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};