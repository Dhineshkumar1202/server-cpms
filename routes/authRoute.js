const express = require('express');
const { register } = require('../controllers/authController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

// POST /signup endpoint
router.post('/signup', register);

module.exports = router;
