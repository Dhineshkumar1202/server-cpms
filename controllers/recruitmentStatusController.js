const RecruitmentStatus = require('../models/recruitmentStatus');

// Get all recruitment statuses
exports.getRecruitmentStatuses = async (req, res) => {
    try {
        const statuses = await RecruitmentStatus.find().populate('studentId jobId');
        res.status(200).json(statuses);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Create a new recruitment status
exports.createRecruitmentStatus = async (req, res) => {
    const { studentId, jobId, status, comments } = req.body;
    try {
        const newStatus = await RecruitmentStatus.create({ studentId, jobId, status, comments });
        res.status(201).json(newStatus);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Update a recruitment status
exports.updateRecruitmentStatus = async (req, res) => {
    const { id } = req.params;
    const updates = req.body;
    try {
        const updatedStatus = await RecruitmentStatus.findByIdAndUpdate(id, updates, { new: true });
        res.status(200).json(updatedStatus);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Delete a recruitment status
exports.deleteRecruitmentStatus = async (req, res) => {
    const { id } = req.params;
    try {
        await RecruitmentStatus.findByIdAndDelete(id);
        res.status(204).send();
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
