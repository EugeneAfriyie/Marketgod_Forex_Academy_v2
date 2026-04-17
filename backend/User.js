const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: 'Student' }, // Can be Student, Mentor, or Admin
  rank: { type: String, default: 'Novice' },
  mgc: { type: Number, default: 0 },          // MarketGod Coins balance
}, { 
  timestamps: true // Automatically adds `createdAt` and `updatedAt`
});

module.exports = mongoose.model('User', userSchema);