const mongoose = require('mongoose');

const companySchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    companyName: { type: String, required: true },
    website: { type: String },
    jobOpenings: [{ title: String, description: String }],
});

module.exports = mongoose.model('Company', companySchema);
