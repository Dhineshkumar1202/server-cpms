const mongoose = require("mongoose");

const academicRecordSchema = new mongoose.Schema({
  studentId: {
    type: String, // Use `mongoose.Schema.Types.ObjectId` if studentId is an ObjectId
    required: true,
  },
  course: { type: String, required: true },
  grade: { type: String, required: true },
  year: { type: Number, required: true },
});

module.exports = mongoose.model("AcademicRecord", academicRecordSchema);
