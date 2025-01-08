const mongoose = require('mongoose');

const JobSchema = new mongoose.Schema({
    title: { type: String, required: true }, // Job title
    description: { type: String, required: true }, // Job details
    subject: { type: String, required: true }, // Relevant subject (e.g., "Computer Science")
    company: { type: String, required: true }, // Company name
    location: { type: String, required: true }, // Job location
    applicationDeadline: { type: Date, required: true }, // Deadline to apply
    postedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Admin', required: true }, // Admin ID
}, { timestamps: true });

module.exports = mongoose.model('Job', JobSchema);
