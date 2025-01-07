const mongoose = require("mongoose");

const JobSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  subject: { type: String, required: true },
  requirements: { type: String, required: true },
  location: { type: String },
  postedBy: { type: mongoose.Schema.Types.ObjectId, ref: "Admin", required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Job", JobSchema);
