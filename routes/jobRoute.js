const express = require("express");
const { getJobs, createJob } = require("../controllers/jobController");
const { verifyAdmin, authMiddleware } = require("../middlewares/authMiddleware");
const validateJob = require("../middlewares/validateJob");

const router = express.Router();


router.get("/", authMiddleware, getJobs);


router.post("/add", authMiddleware, verifyAdmin, validateJob, createJob);

module.exports = router;

