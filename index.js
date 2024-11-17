
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const cron = require('node-cron'); // Importing cron
const RecurringExpense = require('./models/RecurringExpense');
const Expense = require('./models/Expense');

const app = express();

// Connect to database
connectDB();

// Middleware
app.use(express.json());
app.use(cors());

console.log(process.env.PORT);

const PORT = process.env.PORT

// Cron job for recurring expenses
cron.schedule('0 0 * * *', async () => { // Runs every day at midnight
    const today = new Date();
    const recurringExpenses = await RecurringExpense.find();
  
    recurringExpenses.forEach(async (expense) => {
      const { frequency, startDate } = expense;
      let isDue = false;
  
      // Check if the expense is due based on its frequency
      if (frequency === 'daily') isDue = true;
      else if (frequency === 'weekly' && today.getDay() === startDate.getDay()) isDue = true;
      else if (frequency === 'monthly' && today.getDate() === startDate.getDate()) isDue = true;
  
      if (isDue) {
        // Log notification, or send an email/SMS/notification here
        console.log(`Reminder: Recurring expense "${expense.item}" of amount ${expense.amount} is due today.`);
  
        // Optionally add it as an actual expense for today
        await Expense.create({
          date: today,
          time: today.toLocaleTimeString(),
          item: expense.item,
          amount: expense.amount,
          category: expense.category
        });
      }
    });
  });


//expense routes
const expenseRoutes = require('./routes/expenseRoutes');

app.use('/api', expenseRoutes);


app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
