const express = require("express");
const router = express.Router();
const multer = require("multer");
const JobApplication = require("../models/jobApplicationModel");




// Configure Multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); 
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });





// Submit a Job Application
router.post("/", upload.single("file"), async (req, res) => {
  try {
    const { studentId, jobId, coverLetter } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: "Resume file is required" });
    }

    const newApplication = new JobApplication({
      studentId,
      jobId,
      resumeUrl: `/uploads/${req.file.filename}`,
      coverLetter,
    });

    const savedApplication = await newApplication.save();
    res.status(201).json(savedApplication);
  } catch (error) {
    console.error("Error submitting application:", error);
    res.status(500).json({ message: "Error submitting application", error: error.message });
  }
});






// Get Applications by Student ID
router.get("/student/:studentId", async (req, res) => {
  try {
    const applications = await JobApplication.find({ studentId: req.params.studentId });
    res.status(200).json(applications);
  } catch (error) {
    console.error("Error fetching applications by student ID:", error);
    res.status(500).json({ message: "Error fetching applications", error: error.message });
  }
});





// Get Applications by Job ID
router.get("/job/:jobId", async (req, res) => {
  try {
    const applications = await JobApplication.find({ jobId: req.params.jobId });
    res.status(200).json(applications);
  } catch (error) {
    console.error("Error fetching applications by job ID:", error);
    res.status(500).json({ message: "Error fetching applications", error: error.message });
  }
});





// Delete Application
router.delete("/:id", async (req, res) => {
  try {
    await JobApplication.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Application deleted successfully" });
  } catch (error) {
    console.error("Error deleting application:", error);
    res.status(500).json({ message: "Error deleting application", error: error.message });
  }
});

module.exports = router;
