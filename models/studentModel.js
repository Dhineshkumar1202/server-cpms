const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    course: { type: String, required: true },
    year: { type: Number, required: true },
    resume: { type: String }, // Path to the uploaded resume
});

module.exports = mongoose.model('Student', studentSchema);
