const express = require('express');
const router = express.Router();



// Controller functions 
const { createJob, getAllJobs } = require('../controllers/jobController');




// Define routes
router.post('/', createJob); 
router.get('/', getAllJobs); 


// Export router
module.exports = router;
