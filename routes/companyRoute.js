// routes/companyRoute.js
const express = require('express');
const router = express.Router();
const authenticate = require('../middlewares/athenticateToken');
const {
  createCompany,
  getCompanyDetails,
  updateCompanyDetails,
} = require('../controllers/companyController');

// create a new company
router.post('/create', createCompany);

//  get company details (protected)
router.get('/me', authenticate, getCompanyDetails);

// update company details (protected)
router.put('/me', authenticate, updateCompanyDetails);

module.exports = router;
