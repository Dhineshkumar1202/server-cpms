const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/userModel');
const Student = require('../models/studentModel');
const Admin = require('../models/adminModel');
const Company = require('../models/companyModel');

const router = express.Router();

router.post('/signup', async (req, res) => {
    const { name, email, password, role, course, year, department, companyName, website } = req.body;

    try {
        // Validate role
        if (!['student', 'admin', 'company'].includes(role)) {
            return res.status(400).json({ message: 'Invalid role specified' });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user
        const newUser = await User.create({ name, email, password: hashedPassword, role });

        // Create role-specific document
        if (role === 'student') {
            await Student.create({ user: newUser._id, course, year });
        } else if (role === 'admin') {
            await Admin.create({ user: newUser._id, department });
        } else if (role === 'company') {
            await Company.create({ user: newUser._id, companyName, website });
        }

        res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: 'Error creating user', error });
    }
});


router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: 'Invalid credentials' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

        // Fetch role-specific data
        let roleData = {};
        if (user.role === 'student') {
            roleData = await Student.findOne({ user: user._id });
        } else if (user.role === 'admin') {
            roleData = await Admin.findOne({ user: user._id });
        } else if (user.role === 'company') {
            roleData = await Company.findOne({ user: user._id });
        }

        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
            expiresIn: '1h',
        });

        res.json({ token, user, roleData });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});



module.exports = router;
