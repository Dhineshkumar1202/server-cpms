const mongoose = require("mongoose");

const companySchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    companyName: { type: String, required: true },
    website: { type: String, required: true },
});

module.exports = mongoose.model("Company", companySchema);
