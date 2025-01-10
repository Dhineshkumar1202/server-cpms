const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    subject: { type: String, required: true },
    requirements: { type: String },
    location: { type: String, required: true },
    applicationDeadline: { type: Date, required: true },
    postedBy: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model("Job", jobSchema);
