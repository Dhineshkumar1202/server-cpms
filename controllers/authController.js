const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/studentModel');
const Student = require('../models/userModel');

const JWT_SECRET = 'your_jwt_secret';

// Signup Controller
// In authController.js
exports.signup = async (req, res) => {
  const { name, email, password, role, phone } = req.body;

  try {
      const hashedPassword = await bcrypt.hash(password, 10);

      if (role === 'student') {
          const student = new Student({ name, email, password: hashedPassword, phone });
          await student.save();
          return res.status(201).json({ message: 'Student registered successfully' });
      } else if (['admin', 'company'].includes(role)) {
          const user = new User({ name, email, password: hashedPassword, role });
          await user.save();
          return res.status(201).json({ message: `${role} registered successfully` });
      } else {
          return res.status(400).json({ error: 'Invalid role' });
      }
  } catch (error) {
      console.error('Error in signup:', error); // Log the error for debugging
      if (error.code === 11000) {
          return res.status(400).json({ error: 'Email already exists' });
      }
      res.status(500).json({ error: 'Server error', details: error.message });
  }
};


// Login Controller
exports.login = async (req, res) => {
    const { email, password, role } = req.body;

    try {
        if (role === 'student') {
            const student = await Student.findOne({ email });
            if (!student) return res.status(404).json({ error: 'Student not found' });

            const isMatch = await bcrypt.compare(password, student.password);
            if (!isMatch) return res.status(401).json({ error: 'Invalid credentials' });

            const token = jwt.sign({ id: student._id, role: 'student' }, JWT_SECRET, { expiresIn: '1h' });
            return res.json({ token, role: 'student' });
        } else if (['admin', 'company'].includes(role)) {
            const user = await User.findOne({ email, role });
            if (!user) return res.status(404).json({ error: 'User not found' });

            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) return res.status(401).json({ error: 'Invalid credentials' });

            const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, { expiresIn: '1h' });
            return res.json({ token, role: user.role });
        } else {
            return res.status(400).json({ error: 'Invalid role' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};
