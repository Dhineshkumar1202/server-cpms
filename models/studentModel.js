const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    course: { type: String, required: true },
    year: { type: Number, required: true },
});

module.exports = mongoose.model("Student", studentSchema);
