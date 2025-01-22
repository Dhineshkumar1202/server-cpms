const Job = require("../models/jobModel");

const getJobs = async (req, res) => {
  try {
    const { subject } = req.query; // Optional filter by subject
    const query = subject ? { subject } : {};
    const jobs = await Job.find(query);
    res.status(200).json(jobs);
  } catch (error) {
    res.status(500).json({ message: "Error fetching jobs", error });
  }
};


const createJob = async (req, res) => {
  try {
    const { title, description, subject } = req.body;

    const newJob = new Job({
      title,
      description,
      subject,
      postedBy: req.user._id, 
    });

    await newJob.save();
    res.status(201).json({ message: "Job created successfully", job: newJob });
  } catch (error) {
    res.status(500).json({ message: "Error creating job", error });
  }
};

module.exports = { getJobs, createJob };
