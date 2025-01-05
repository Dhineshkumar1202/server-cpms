// models/AcademicRecord.js
const mongoose = require("mongoose");

const academicRecordSchema = new mongoose.Schema({
  studentId: {
    type: String,
    ref: "Student",
    required: true,
  },
  grades: {
    type: Map, // Example: { "Math": "A", "English": "B+" }
    of: String,
  },
  achievements: [String],
  transcript: {
    type: String, // Store file path or URL for uploaded transcript
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("AcademicRecord", academicRecordSchema);
