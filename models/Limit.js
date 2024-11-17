// models/Limit.js
const mongoose = require('mongoose');

const limitSchema = new mongoose.Schema({
  type: { type: String, enum: ['daily', 'monthly'], required: true },
  amount: { type: Number, required: true },
});

module.exports = mongoose.model('Limit', limitSchema);