const express = require("express");
const router = express.Router();
const Job = require("../models/jobModel");

// Create a new Job Posting (Admin only)
router.post("/create", async (req, res) => {
  try {
    const { title, description, subjectCategory, company, location, postedBy } = req.body;

    if (!title || !description || !subjectCategory || !company || !location || !postedBy) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newJob = new Job({
      title,
      description,
      subjectCategory,
      company,
      location,
      postedBy, 
    });

    const savedJob = await newJob.save();
    res.status(201).json(savedJob);
  } catch (error) {
    console.error("Error posting job:", error);
    res.status(500).json({ message: "Error posting job", error: error.message });
  }
});

module.exports = router;
