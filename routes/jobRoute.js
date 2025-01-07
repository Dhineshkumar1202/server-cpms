const express = require("express");
const { getJobs, createJob } = require("../controllers/jobController");
const router = express.Router();

// GET all jobs with optional filters
router.get("/", getJobs);

// POST a new job (Admin only)
router.post("/", createJob);

module.exports = router;
