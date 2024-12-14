const mongoose = require('mongoose');

const companySchema = new mongoose.Schema({
    companyName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    // Add other company-specific fields (e.g., job listings, company profile)
});

module.exports = mongoose.model('Company', companySchema);
