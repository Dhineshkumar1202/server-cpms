const Job = require("../models/jobModel");

// Fetch all jobs with filters
const getJobs = async (req, res) => {
  try {
    const { subject } = req.query;
    const filter = subject ? { subject } : {};
    const jobs = await Job.find(filter).sort({ createdAt: -1 });
    res.status(200).json(jobs);
  } catch (error) {
    res.status(500).json({ message: "Error fetching jobs", error });
  }
};

// Create a job
const createJob = async (req, res) => {
  try {
    const { title, description, subject, requirements, location, postedBy } = req.body;
    const newJob = new Job({ title, description, subject, requirements, location, postedBy });
    const savedJob = await newJob.save();
    res.status(201).json(savedJob);
  } catch (error) {
    res.status(500).json({ message: "Error creating job", error });
  }
};

module.exports = { getJobs, createJob };
