const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    course: {
        type: String,
        required: true,
        enum: ['Computer Science', 'Information Technology', 'Electronics', 'Mechanical'], 
    },
    year: {
        type: String,
        required: true,
        enum: ['1st Year', '2nd Year', '3rd Year', '4th Year'],
    },
});

module.exports = mongoose.model('Student', studentSchema);
