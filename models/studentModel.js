const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  phone: { type: String },
  resume: { type: String },  // File link or file path
  applicationStatus: { type: String, enum: ['submitted', 'under review', 'shortlisted', 'rejected', 'accepted'], default: 'submitted' },
  interviewSchedule: { type: Date },
});

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;
