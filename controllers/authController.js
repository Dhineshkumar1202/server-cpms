const User = require('../models/userModel');
const Student = require('../models/studentModel');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const { generateToken } = require('../utils/jwtUtils');


const register = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { name, email, password, role, username, department, grade, resume } = req.body;

    // Input Validation
    if (!name || !email || !password || !role) {
      return res.status(400).json({ message: 'Name, email, password, and role are required' });
    }

    console.log('Step: Checking if user already exists');
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    if (['admin', 'company'].includes(role) && !username) {
      return res.status(400).json({ message: 'Username is required for admin or company roles' });
    }

    console.log('Step: Hashing password');
    const hashedPassword = await bcrypt.hash(password, 10);

    console.log('Step: Creating user object');
    const user = new User({
      name,
      email,
      password: hashedPassword,
      role,
      username: role !== 'student' ? username : undefined,
    });

    console.log('Step: Saving user to database');
    const savedUser = await user.save({ session });

    let student = null;
    if (role === 'student') {
      if (!department || !grade) {
        return res.status(400).json({ message: 'Department and grade are required for student registration' });
      }

      console.log('Step: Creating student object');
      student = new Student({
        userId: savedUser._id,
        department,
        grade,
        resume,
      });

      console.log('Step: Saving student to database');
      await student.save({ session });
    }

    console.log('Step: Committing transaction');
    await session.commitTransaction();
    session.endSession();

    console.log('Step: Registration successful');
    res.status(201).json({
      message: 'User registered successfully',
      user,
      student,
    });
  } catch (error) {
    console.error('Error during registration:', error);

    console.log('Step: Aborting transaction');
    try {
      await session.abortTransaction();
    } catch (abortError) {
      console.error('Error aborting transaction:', abortError);
    }
    session.endSession();

    res.status(500).json({ message: 'Registration failed', error: error.message });
  }
};



const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

   
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

   
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

   
    const token = generateToken(user);

    res.status(200).json({
      message: 'Login successful',
      token,
      user: { id: user._id, name: user.name, role: user.role, username: user.username },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = { loginUser, register };
