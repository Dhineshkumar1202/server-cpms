const Student = require("../models/studentModel");

// Fetch student profile
const getStudentProfile = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) return res.status(404).json({ message: "Student not found" });
    res.status(200).json(student);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update student profile
const updateStudentProfile = async (req, res) => {
  try {
    const { name, contact, academicRecords } = req.body;
    const student = await Student.findByIdAndUpdate(
      req.params.id,
      { name, contact, academicRecords },
      { new: true }
    );
    res.status(200).json(student);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getStudentProfile, updateStudentProfile };
