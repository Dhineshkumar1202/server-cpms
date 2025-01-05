// models/AcademicRecord.js
const mongoose = require("mongoose");

const academicRecordSchema = new mongoose.Schema({
  studentId: {
    type: String,
    ref: "Student",
    required: true,
  },
  grades: {
    type: Map, 
    of: String,
  },
  achievements: [String],
  transcript: {
    type: String, 
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("AcademicRecord", academicRecordSchema);
