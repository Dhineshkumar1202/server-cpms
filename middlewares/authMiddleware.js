const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

// Middleware function for protecting routes
exports.protect = async (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1]; // Extract token from Authorization header

  if (!token) {
    return res.status(403).json({ message: 'Access denied. No token provided.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify the token using JWT_SECRET
    const user = await User.findById(decoded.userId); // Find the user based on the ID from the token

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    req.user = user; // Attach the user to the request object
    next(); // Call the next middleware or route handler
  } catch (error) {
    res.status(400).json({ message: 'Invalid token' });
  }
};
