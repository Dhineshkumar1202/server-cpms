const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true, // Ensuring that the 'name' field is required
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  // other fields...
});

const Student = mongoose.model('Student', studentSchema);
module.exports = Student;
