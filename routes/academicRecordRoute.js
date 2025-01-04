const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const AcademicRecord = require("../models/academicRecordModel");

// Add Academic Record
router.post("/", async (req, res) => {
  try {
    const newRecord = new AcademicRecord(req.body);
    const savedRecord = await newRecord.save();
    res.status(201).json(savedRecord);
  } catch (error) {
    console.error("Error adding academic record:", error);
    res.status(500).json({ message: "Error adding academic record", error: error.message });
  }
});

// Get Academic Records by Student ID
router.get("/:studentId", async (req, res) => {
  try {
    // Validate studentId as numeric
    if (!/^\d+$/.test(req.params.studentId)) {
      return res.status(400).json({ message: "Invalid studentId format" });
    }

    console.log("Fetching records for studentId:", req.params.studentId);
    const records = await AcademicRecord.find({ studentId: req.params.studentId });
    console.log("Fetched records:", records);

    if (!records.length) {
      return res.status(404).json({ message: "No records found for this student" });
    }

    res.status(200).json(records);
  } catch (error) {
    console.error("Error in GET /:studentId:", error);
    res.status(500).json({ message: "Error fetching academic records", error: error.message });
  }
});


// Update Academic Record
router.put("/:id", async (req, res) => {
  try {
    const updatedRecord = await AcademicRecord.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updatedRecord);
  } catch (error) {
    console.error("Error updating academic record:", error);
    res.status(500).json({ message: "Error updating academic record", error: error.message });
  }
});

// Delete Academic Record
router.delete("/:id", async (req, res) => {
  try {
    await AcademicRecord.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Academic record deleted" });
  } catch (error) {
    console.error("Error deleting academic record:", error);
    res.status(500).json({ message: "Error deleting academic record", error: error.message });
  }
});

module.exports = router;
