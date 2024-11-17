// models/RecurringExpense.js
const mongoose = require('mongoose');

const recurringExpenseSchema = new mongoose.Schema({
  item: { type: String, required: true },
  amount: { type: Number, required: true },
  category: { type: String, required: true },
  frequency: { type: String, enum: ['daily', 'weekly', 'monthly'], required: true },
  startDate: { type: Date, required: true }
});

module.exports = mongoose.model('RecurringExpense', recurringExpenseSchema);
