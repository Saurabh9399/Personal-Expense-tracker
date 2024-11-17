// controllers/recurringExpenseController.js
const RecurringExpense = require('../models/RecurringExpense');

// Add a recurring expense
exports.addRecurringExpense = async (req, res) => {
  try {
    const { item, amount, category, frequency, startDate } = req.body;
    const newRecurringExpense = new RecurringExpense({ item, amount, category, frequency, startDate });
    await newRecurringExpense.save();
    res.status(201).json(newRecurringExpense);
  } catch (error) {
    res.status(500).json({ message: 'Failed to add recurring expense', error });
  }
};

// Get all recurring expenses
exports.getRecurringExpenses = async (req, res) => {
  try {
    const recurringExpenses = await RecurringExpense.find();
    res.status(200).json(recurringExpenses);
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve recurring expenses', error });
  }
};
