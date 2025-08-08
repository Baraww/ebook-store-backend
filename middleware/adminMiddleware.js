// middleware/adminMiddleware.js
module.exports = function(req, res, next) {
  if (req.user && req.user.role === 'admin') {
    next(); // User is an admin, proceed to the route
  } else {
    res.status(403).json({ message: 'Forbidden: Admins only' });
  }
};