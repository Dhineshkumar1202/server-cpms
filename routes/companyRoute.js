// routes/companyRoute.js
const express = require('express');
const router = express.Router();
const { createCompany, getCompanyDetails } = require('../controllers/companyController');  // Correct import

// POST route for creating a company
router.post('/create', createCompany); // This should point to createCompany from companyController

// GET route for getting company details
router.get('/details', getCompanyDetails); // This should point to getCompanyDetails from companyController

module.exports = router;
