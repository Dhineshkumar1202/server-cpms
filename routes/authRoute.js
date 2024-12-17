const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const Student = require('../models/studentModel');
const Admin = require('../models/adminModel');
const Company = require('../models/companyModel');

// Initialize dotenv to load environment variables from the .env file
require('dotenv').config();

const router = express.Router();

// Sign-up route
router.post("/signup", async (req, res) => {
    const { name, email, password, role, additionalData } = req.body;

    if (!name || !email || !password || !role) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Save user to User model
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            role,
        });

        // Save role-specific data
        if (role === "student") {
            await Student.create({
                userId: user._id,
                course: additionalData.course,
                year: additionalData.year,
            });
        } else if (role === "admin") {
            await Admin.create({
                userId: user._id,
                department: additionalData.department,
            });
        } else if (role === "company") {
            await Company.create({
                userId: user._id,
                companyName: additionalData.companyName,
                website: additionalData.website,
            });
        }

        res.status(201).json({ message: "User created successfully", user });
    } catch (error) {
        console.error("Error creating user:", error);
        res.status(400).json({ message: "Error creating user", error });
    }
});

// Login route
router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required" });
    }

    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: "Invalid credentials" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

        // Fetch role-specific data
        let roleData = {};
        if (user.role === "student") {
            roleData = await Student.findOne({ userId: user._id });
        } else if (user.role === "admin") {
            roleData = await Admin.findOne({ userId: user._id });
        } else if (user.role === "company") {
            roleData = await Company.findOne({ userId: user._id });
        }

        // Check if JWT_SECRET is set in the environment
        if (!process.env.JWT_SECRET) {
            return res.status(500).json({ message: "Missing JWT_SECRET environment variable" });
        }

        // Create a JWT token using the user's id and role
        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
            expiresIn: "1h",
        });

        res.json({
            token,
            role: user.role,
            user,
            roleData,
        });
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ message: "Server error", error });
    }
});

module.exports = router;
