const express = require('express');
const router = express.Router();
const expenseController = require('../controllers/expenseController');
const limitController = require('../controllers/limitController');
const { checkBudgetLimit } = require('../middleware/budgetCheck');

// Add a new expense
router.post('/', checkBudgetLimit, expenseController.createExpense);

// Get expenses by day or month
router.get('/filter', expenseController.getExpensesByDateOrMonth);

// Update an expense
router.put('/:id', expenseController.updateExpense);

// Delete an expense
router.delete('/:id', expenseController.deleteExpense);

// Set daily or monthly spending limit
router.post('/limit', limitController.setLimit);

// Get remaining daily or monthly budget
router.get('/remaining-budget', limitController.getRemainingBudget);

// routes/expenseRoutes.js
router.get('/date-range', expenseController.getExpensesByDateRange);

router.get('/monthly-summary', expenseController.getMonthlySummary);



module.exports = router;
