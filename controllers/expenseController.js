const Expense = require('../models/Expense');
const Limit = require('../models/Limit');

// Create a new expense
exports.createExpense = async (req, res) => {
  try {
    const { date, time, item, amount } = req.body;
    const newExpense = new Expense({ date, time, item, amount });
    await newExpense.save();
    res.status(201).json(newExpense);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create expense', error });
  }
};

// Get expenses by date or month
exports.getExpensesByDateOrMonth = async (req, res) => {
  const { date, month } = req.query;
  try {
    let expenses;
    if (date) {
      expenses = await Expense.find({ date: new Date(date) });
    } else if (month) {
      const startOfMonth = new Date(month);
      const endOfMonth = new Date(startOfMonth.getFullYear(), startOfMonth.getMonth() + 1, 0);
      expenses = await Expense.find({ date: { $gte: startOfMonth, $lte: endOfMonth } });
    }
    res.status(200).json(expenses);
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve expenses', error });
  }
};

// Update an expense by ID
exports.updateExpense = async (req, res) => {
  try {
    const updatedExpense = await Expense.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedExpense) return res.status(404).json({ error: 'Expense not found' });
    res.status(200).json(updatedExpense);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update expense', error });
  }
};

// Delete an expense by ID
exports.deleteExpense = async (req, res) => {
  try {
    const deletedExpense = await Expense.findByIdAndDelete(req.params.id);
    if (!deletedExpense) return res.status(404).json({ error: 'Expense not found' });
    res.status(200).json({ message: 'Expense deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete expense', error });
  }
};


exports.getExpensesByDateRange = async (req, res) => {
    const { startDate, endDate } = req.query;
    try {
      const expenses = await Expense.find({
        date: { $gte: new Date(startDate), $lte: new Date(endDate) }
      });
      res.status(200).json(expenses);
    } catch (error) {
      res.status(500).json({ message: 'Failed to retrieve expenses', error });
    }
  };

  // controllers/expenseController.js
exports.getMonthlySummary = async (req, res) => {
    const { month } = req.query;
    const startOfMonth = new Date(month);
    const endOfMonth = new Date(startOfMonth.getFullYear(), startOfMonth.getMonth() + 1, 0);
  
    try {
      const expenses = await Expense.find({ date: { $gte: startOfMonth, $lte: endOfMonth } });
      const totalSpent = expenses.reduce((sum, expense) => sum + expense.amount, 0);
      res.status(200).json({ totalSpent });
    } catch (error) {
      res.status(500).json({ message: 'Failed to retrieve monthly summary', error });
    }
  };
  
  // controllers/expenseController.js
exports.getMonthlySummary = async (req, res) => {
    const { month } = req.query;
    const startOfMonth = new Date(month);
    const endOfMonth = new Date(startOfMonth.getFullYear(), startOfMonth.getMonth() + 1, 0);
  
    try {
      const expenses = await Expense.find({ date: { $gte: startOfMonth, $lte: endOfMonth } });
      const totalSpent = expenses.reduce((sum, expense) => sum + expense.amount, 0);
      res.status(200).json({ totalSpent });
    } catch (error) {
      res.status(500).json({ message: 'Failed to retrieve monthly summary', error });
    }
  };
  