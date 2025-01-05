const mongoose = require("mongoose");

const jobApplicationSchema = new mongoose.Schema({
  studentId: {
    type: String,
    required: true,
  },
  jobId: {
    type: String,
    required: true,
  },
  resumeUrl: {
    type: String,
    required: true,
  },
  coverLetter: {
    type: String,
    required: false,
  },
  applicationDate: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("JobApplication", jobApplicationSchema);
