const mongoose = require('mongoose');

const recruitmentStatusSchema = new mongoose.Schema({
    studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
    jobId: { type: mongoose.Schema.Types.ObjectId, ref: 'Job', required: true },
    status: { type: String, enum: ['Applied', 'Reviewed', 'Shortlisted', 'Interview Scheduled', 'Hired', 'Rejected'], default: 'Applied' },
    comments: { type: String, default: '' },
    updatedAt: { type: Date, default: Date.now }
});

const RecruitmentStatus = mongoose.model('RecruitmentStatus', recruitmentStatusSchema);
module.exports = RecruitmentStatus;
