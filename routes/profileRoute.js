const express = require("express");
const { getStudentProfile, updateStudentProfile } = require("../controllers/studentController")
const router = express.Router();

router.get("/:id", getStudentProfile); 
router.put("/:id", updateStudentProfile); 

module.exports = router;
