const AcademicRecord = require("../models/academicRecordModel");

exports.addAcademicRecord = async (req, res) => {
  try {
    const newRecord = new AcademicRecord(req.body);
    const savedRecord = await newRecord.save();
    res.status(201).json(savedRecord);
  } catch (error) {
    res.status(500).json({ message: "Error adding academic record", error });
  }
};

exports.getAcademicRecords = async (req, res) => {
  try {
    const records = await AcademicRecord.find({ studentId: req.params.studentId });
    res.status(200).json(records);
  } catch (error) {
    res.status(500).json({ message: "Error fetching academic records", error });
  }
};

exports.updateAcademicRecord = async (req, res) => {
  try {
    const updatedRecord = await AcademicRecord.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updatedRecord);
  } catch (error) {
    res.status(500).json({ message: "Error updating academic record", error });
  }
};

exports.deleteAcademicRecord = async (req, res) => {
  try {
    await AcademicRecord.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Academic record deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting academic record", error });
  }
};
