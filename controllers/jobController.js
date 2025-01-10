const Job = require("../models/jobModel");
const Joi = require("joi");

// Validation schema
const jobSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
  subject: Joi.string().required(),
  requirements: Joi.string().optional(),
  location: Joi.string().required(),
  applicationDeadline: Joi.date().required(),
  postedBy: Joi.string().required(),
});

// Fetch all jobs with filters and pagination
const getJobs = async (req, res) => {
  try {
    const { subject, location, page = 1, limit = 10 } = req.query;

    const filter = {};
    if (subject) filter.subject = subject;
    if (location) filter.location = location;

    const jobs = await Job.find(filter)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));

    res.status(200).json(jobs);
  } catch (error) {
    res.status(500).json({ message: "Error fetching jobs", error: error.message });
  }
};

// Create a job
const createJob = async (req, res) => {
  try {
    const { error, value } = jobSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const newJob = new Job(value);
    const savedJob = await newJob.save();
    res.status(201).json(savedJob);
  } catch (error) {
    res.status(500).json({ message: "Error creating job", error: error.message });
  }
};

module.exports = { getJobs, createJob };
