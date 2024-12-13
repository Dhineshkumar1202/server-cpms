const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['admin', 'student', 'company'], required: true },
  status: { type: String, enum: ['active', 'inactive'], default: 'active' },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
