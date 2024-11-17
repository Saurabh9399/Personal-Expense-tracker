// controllers/budgetController.js
const Budget = require('../models/Budget');

exports.setCategoryBudget = async (req, res) => {
  const { category, limit } = req.body;
  try {
    const budget = await Budget.findOneAndUpdate(
      { category },
      { limit },
      { new: true, upsert: true }
    );
    res.status(200).json(budget);
  } catch (error) {
    res.status(500).json({ message: 'Failed to set budget limit', error });
  }
};


exports.getCategoryBudget = async (req, res) => {
    const { category } = req.params;
    try {
      const budget = await Budget.findOne({ category });
      res.status(200).json(budget);
    } catch (error) {
      res.status(500).json({ message: 'Failed to retrieve budget limit', error });
    }
  };
  