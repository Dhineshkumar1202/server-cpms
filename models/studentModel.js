const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  department: { type: String, required: true },
  grade: { type: String, required: true },
  resume: { type: String },
});

module.exports = mongoose.model('Student', studentSchema);
