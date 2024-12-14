const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    // Add other student-specific fields (resume, cover letter, etc.)
});

module.exports = mongoose.model('Student', studentSchema);
