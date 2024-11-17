// models/Budget.js
const mongoose = require('mongoose');

const budgetSchema = new mongoose.Schema({
  category: { type: String, required: true },
  limit: { type: Number, required: true }
});

module.exports = mongoose.model('Budget', budgetSchema);
