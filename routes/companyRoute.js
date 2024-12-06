const express = require('express');
const router = express.Router();
const { getCompanyDetails } = require('../controllers/companyController');
const { protect } = require('../middlewares/authMiddleware');

router.get('/me', protect, getCompanyDetails);

module.exports = router;
