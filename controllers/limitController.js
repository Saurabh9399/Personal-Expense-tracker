const Limit = require('../models/Limit');
const Expense = require('../models/Expense');

// Set daily or monthly spending limit
exports.setLimit = async (req, res) => {
  try {
    const { type, amount } = req.body;
    let limit = await Limit.findOneAndUpdate({ type }, { amount }, { new: true, upsert: true });
    res.status(200).json(limit);
  } catch (error) {
    res.status(500).json({ message: 'Failed to set limit', error });
  }
};

// Get remaining daily or monthly budget
exports.getRemainingBudget = async (req, res) => {
  try {
    const { type } = req.query;
    const limit = await Limit.findOne({ type });
    if (!limit) return res.status(404).json({ error: 'Limit not set' });

    const today = new Date();
    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const expenses = await Expense.find(
      type === 'daily'
        ? { date: today }
        : { date: { $gte: startOfMonth, $lte: today } }
    );
    
    const totalSpent = expenses.reduce((sum, expense) => sum + expense.amount, 0);
    const remainingBudget = limit.amount - totalSpent;

    res.status(200).json({ remainingBudget });
  } catch (error) {
    res.status(500).json({ message: 'Failed to calculate remaining budget', error });
  }
};
