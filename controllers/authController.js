const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Student = require('../models/studentModel');
const Company = require('../models/companyModel');
const Admin = require('../models/adminModel');
const { generateToken } = require('../utils/generateToken');

// Sign up for Student, Company, and Admin
exports.signup = async (req, res) => {
    const { role, email, password, fullName, companyName } = req.body;

    try {
        let user;
        if (role === 'student') {
            user = await Student.findOne({ email });
            if (user) return res.status(400).json({ message: "Student already exists." });
            const hashedPassword = await bcrypt.hash(password, 12);
            user = new Student({ fullName, email, password: hashedPassword });
        } else if (role === 'company') {
            user = await Company.findOne({ email });
            if (user) return res.status(400).json({ message: "Company already exists." });
            const hashedPassword = await bcrypt.hash(password, 12);
            user = new Company({ companyName, email, password: hashedPassword });
        } else if (role === 'admin') {
            user = await Admin.findOne({ email });
            if (user) return res.status(400).json({ message: "Admin already exists." });
            const hashedPassword = await bcrypt.hash(password, 12);
            user = new Admin({ adminName: fullName, email, password: hashedPassword });
        } else {
            return res.status(400).json({ message: "Invalid role" });
        }

        await user.save();
        const token = generateToken(user._id, role);
        res.status(201).json({ message: "User created", token });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

// Login for Student, Company, and Admin
exports.login = async (req, res) => {
    const { email, password, role } = req.body;

    try {
        let user;
        if (role === 'student') {
            user = await Student.findOne({ email });
        } else if (role === 'company') {
            user = await Company.findOne({ email });
        } else if (role === 'admin') {
            user = await Admin.findOne({ email });
        } else {
            return res.status(400).json({ message: "Invalid role" });
        }

        if (!user) return res.status(400).json({ message: "User not found" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

        const token = generateToken(user._id, role);
        res.status(200).json({ message: "Login successful", token });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};
