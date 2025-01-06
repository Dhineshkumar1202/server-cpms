const express = require("express");
const router = express.Router();
const PlacementDrive = require("../models/placementDriveModel");

// Add Placement Drive
router.post("/", async (req, res) => {
  try {
    const newPlacementDrive = new PlacementDrive(req.body);
    const savedPlacementDrive = await newPlacementDrive.save();
    res.status(201).json(savedPlacementDrive);
  } catch (error) {
    console.error("Error adding placement drive:", error);
    res.status(500).json({ message: "Error adding placement drive", error: error.message });
  }
});



// Get All Placement Drives
router.get("/", async (req, res) => {
  try {
    const placementDrives = await PlacementDrive.find();
    res.status(200).json(placementDrives);
  } catch (error) {
    console.error("Error fetching placement drives:", error);
    res.status(500).json({ message: "Error fetching placement drives", error: error.message });
  }
});



// Get Placement Drive by ID
router.get("/:id", async (req, res) => {
  try {
    const placementDrive = await PlacementDrive.findById(req.params.id);
    if (!placementDrive) {
      return res.status(404).json({ message: "Placement drive not found" });
    }
    res.status(200).json(placementDrive);
  } catch (error) {
    console.error("Error fetching placement drive:", error);
    res.status(500).json({ message: "Error fetching placement drive", error: error.message });
  }
});




// Update Placement Drive
router.put("/:id", async (req, res) => {
  try {
    const updatedPlacementDrive = await PlacementDrive.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updatedPlacementDrive) {
      return res.status(404).json({ message: "Placement drive not found" });
    }
    res.status(200).json(updatedPlacementDrive);
  } catch (error) {
    console.error("Error updating placement drive:", error);
    res.status(500).json({ message: "Error updating placement drive", error: error.message });
  }
});




// Delete Placement Drive
router.delete("/:id", async (req, res) => {
  try {
    const deletedPlacementDrive = await PlacementDrive.findByIdAndDelete(req.params.id);
    if (!deletedPlacementDrive) {
      return res.status(404).json({ message: "Placement drive not found" });
    }
    res.status(200).json({ message: "Placement drive deleted successfully" });
  } catch (error) {
    console.error("Error deleting placement drive:", error);
    res.status(500).json({ message: "Error deleting placement drive", error: error.message });
  }
});


module.exports = router;
