const express = require('express');
const router = express.Router();

// Controller functions (ensure these are defined in your controllers)
const { createJob, getAllJobs } = require('../controllers/jobController');

// Define routes
router.post('/', createJob); // Post route to create a job
router.get('/', getAllJobs); // Get route to fetch all jobs

// Export router
module.exports = router;
