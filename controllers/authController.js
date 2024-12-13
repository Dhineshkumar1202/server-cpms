const bcrypt = require('bcryptjs');
const User = require('../models/userModel');
const Student = require('../models/studentModel');
const Company = require('../models/companyModel');

const register = async (req, res) => {
  const { email, password, role, firstName, lastName, phone, companyName } = req.body;

  try {
    // Check if email is already in use
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already in use' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the user
    const user = new User({
      email,
      password: hashedPassword,
      role,
    });

    // Save the user
    await user.save();

    // Depending on the role, create additional info in the respective table
    if (role === 'student') {
      const student = new Student({
        userId: user._id,
        firstName,
        lastName,
        phone,
        applicationStatus: 'submitted',
      });
      await student.save();
      return res.status(201).json({ message: 'Student registered successfully' });
    } else if (role === 'company') {
      const company = new Company({
        userId: user._id,
        companyName,
        contactEmail: email,
        contactPhone: phone,
      });
      await company.save();
      return res.status(201).json({ message: 'Company registered successfully' });
    } else if (role === 'admin') {
      return res.status(201).json({ message: 'Admin registered successfully' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { register };
