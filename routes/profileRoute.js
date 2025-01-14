const express = require('express');
const Student = require('../models/studentModel'); // Correct path to your studentModel
const router = express.Router();

// Create a student profile
router.post('/profile', async (req, res) => {
    try {
        const student = new Student(req.body);
        await student.save();
        res.status(201).json(student);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;
