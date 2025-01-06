const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema(
    {
        jobTitle: {
            type: String,
            required: true,
        },
        companyName: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        location: {
            type: String,
        },
        salary: {
            type: Number,
        },
        company: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Company',  // Linking the job to a company
        },
    },
    { timestamps: true }
);

const Job = mongoose.model('Job', jobSchema);

module.exports = Job;
