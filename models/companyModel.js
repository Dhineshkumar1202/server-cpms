const mongoose = require('mongoose');

const companySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  companyName: { type: String, required: true },
  contactEmail: { type: String, required: true },
  contactPhone: { type: String },
  companyProfile: { type: String },
});

const Company = mongoose.model('Company', companySchema);

module.exports = Company;
