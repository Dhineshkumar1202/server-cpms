const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
    adminName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    // Add other admin-specific fields (e.g., admin privileges, etc.)
});

module.exports = mongoose.model('Admin', adminSchema);
