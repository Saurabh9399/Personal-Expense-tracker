// routes/budgetRoutes.js
const express = require('express');
const router = express.Router();
const { setCategoryBudget, getCategoryBudget } = require('../controllers/budgetController');

router.post('/set', setCategoryBudget);
router.get('/:category', getCategoryBudget);

module.exports = router;
