// routes/academicRecords.js
const express = require("express");
const router = express.Router();
const AcademicRecord = require("../models/academicRecordModel");

// Add Academic Record
router.post("/", async (req, res) => {
  try {
    const newRecord = new AcademicRecord(req.body);
    const savedRecord = await newRecord.save();
    res.status(201).json(savedRecord);
  } catch (error) {
    res.status(500).json({ message: "Error adding academic record", error });
  }
});

// Get Academic Records by Student ID
router.get("/:studentId", async (req, res) => {
  try {
    const records = await AcademicRecord.find({ studentId: req.params.studentId });
    res.status(200).json(records);
  } catch (error) {
    res.status(500).json({ message: "Error fetching academic records", error });
  }
});

// Update Academic Record
router.put("/:id", async (req, res) => {
  try {
    const updatedRecord = await AcademicRecord.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updatedRecord);
  } catch (error) {
    res.status(500).json({ message: "Error updating academic record", error });
  }
});

// Delete Academic Record
router.delete("/:id", async (req, res) => {
  try {
    await AcademicRecord.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Academic record deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting academic record", error });
  }
});

module.exports = router;
