// routes/recurringExpenseRoutes.js
const express = require('express');
const router = express.Router();
const { addRecurringExpense, getRecurringExpenses } = require('../controllers/recurringExpenseController');

router.post('/', addRecurringExpense);
router.get('/', getRecurringExpenses);

module.exports = router;
