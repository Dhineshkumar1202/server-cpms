const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');
const User = require('../models/userModel');

const router = express.Router();

// Admin can access all user profiles
router.get('/profiles', authMiddleware, roleMiddleware(['admin']), async (req, res) => {
  const users = await User.find();
  res.json(users);
});

module.exports = router;
