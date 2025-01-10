const express = require("express");
const { getJobs, createJob } = require("../controllers/jobController");
const { verifyAdmin } = require("../middlewares/authMiddleware");
const validateJob = require("../middlewares/validateJob");
const router = express.Router();


router.get("/", getJobs);


router.post("/", verifyAdmin, validateJob, createJob);

module.exports = router;
