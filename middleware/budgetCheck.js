// middleware/budgetCheck.js
const Budget = require('../models/Budget');
const Expense = require('../models/Expense');

exports.checkBudgetLimit = async (req, res, next) => {
  const { category, amount } = req.body;

  try {
    const budget = await Budget.findOne({ category });
    if (budget) {
      const totalSpentInCategory = await Expense.aggregate([
        { $match: { category } },
        { $group: { _id: null, total: { $sum: '$amount' } } }
      ]);

      const currentSpent = totalSpentInCategory.length ? totalSpentInCategory[0].total : 0;
      const projectedTotal = currentSpent + amount;

      if (projectedTotal > budget.limit) {
        console.log(`Alert: Exceeding budget for category "${category}". Budget limit: ${budget.limit}, Current: ${projectedTotal}`);
      }
    }
    next();
  } catch (error) {
    res.status(500).json({ message: 'Error checking budget limit', error });
  }
};
