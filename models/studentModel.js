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
    contact: { 
        type: String, 
        required: false, 
        default: '' 
    }, // Student's contact number
    academicRecords: {
        grades: { type: String, default: '' }, 
        achievements: { type: [String], default: [] }, 
    },
    resume: { 
        type: String, 
        default: '' 
    }, // File path or URL for the resume
    applications: [
        {
            status: { 
                type: String, 
                enum: ['Submitted', 'Reviewed', 'Shortlisted'], 
                default: 'Submitted' 
            },
            interviewSchedule: { 
                type: Date, 
                default: null 
            },
        },
    ],
});

module.exports = mongoose.model('Student', studentSchema);
