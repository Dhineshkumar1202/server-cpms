const Job = require('../models/jobModel');
const Company = require('../models/companyModel');

// Create a new job
exports.createJob = async (req, res) => {
    try {
        const { jobTitle, companyName, description, location, salary } = req.body;

     
        if (!jobTitle || !companyName || !description) {
            return res.status(400).json({ message: 'Please provide all required fields' });
        }

      
        const company = await Company.findOne({ name: companyName });
        if (!company) {
            return res.status(400).json({ message: 'Company not found' });
        }

        // Create new job
        const newJob = new Job({
            jobTitle,
            companyName,
            description,
            location,
            salary,
            company: company._id, 
        });

        const savedJob = await newJob.save();
        res.status(201).json({
            message: 'Job created successfully',
            job: savedJob,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Get all jobs
exports.getAllJobs = async (req, res) => {
    try {
        const jobs = await Job.find().populate('company'); 
        res.status(200).json({
            message: 'Jobs fetched successfully',
            jobs,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Get job by ID
exports.getJobById = async (req, res) => {
    const jobId = req.params.jobId;
    try {
        const job = await Job.findById(jobId).populate('company');
        if (!job) {
            return res.status(404).json({ message: 'Job not found' });
        }
        res.status(200).json({
            message: `Job with ID ${jobId} fetched`,
            job,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Update a job by ID
exports.updateJob = async (req, res) => {
    const jobId = req.params.jobId;
    const { jobTitle, companyName, description, location, salary } = req.body;

    try {
        
        const updatedJob = await Job.findByIdAndUpdate(
            jobId,
            { jobTitle, companyName, description, location, salary },
            { new: true } 
        ).populate('company');

        if (!updatedJob) {
            return res.status(404).json({ message: 'Job not found' });
        }

        res.status(200).json({
            message: `Job with ID ${jobId} updated`,
            job: updatedJob,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Delete a job by ID
exports.deleteJob = async (req, res) => {
    const jobId = req.params.jobId;

    try {
        
        const deletedJob = await Job.findByIdAndDelete(jobId);

        if (!deletedJob) {
            return res.status(404).json({ message: 'Job not found' });
        }

        res.status(200).json({
            message: `Job with ID ${jobId} deleted`,
            job: deletedJob,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};
