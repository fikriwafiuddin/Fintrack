import User from "../models/userModel.js"
import { z } from "zod"
import validation from "../validations/validation.js"
import Transaction from "../models/transactionModel.js"
import recurringService from "./recurringService.js"

const getBalance = async (user) => {
  // Process any pending recurring transactions (Lazy Evaluation)
  try {
    await recurringService.processRecurrings(user)
  } catch (error) {
    // Log error but don't fail the request
    console.error("Error processing recurring transactions:", error)
  }

  let userData = await User.findOne({ userId: user })
  if (!userData) {
    userData = new User({ userId: user, balance: 0 })
    await userData.save()
  }

  return userData.balance
}

const summaryValidation = z.object({
  period: z.enum(["today", "week", "month"], {
    required_error: "Period is required",
    message: "Period must be either today, week, or month",
  }),
})

const getSummary = async (request, user) => {
  const { period } = validation(summaryValidation, request)

  const now = new Date()
  let startDate

  switch (period) {
    case "today": {
      startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate())
      break
    }

    case "week": {
      const day = now.getDay()
      const diff = now.getDate() - day + (day === 0 ? -6 : 1)
      startDate = new Date(now.getFullYear(), now.getMonth(), diff)
      break
    }

    case "month": {
      startDate = new Date(now.getFullYear(), now.getMonth(), 1)
      break
    }

    default:
      throw new Error("Invalid period value. Use 'today', 'week', or 'month'.")
  }

  const query = {
    date: { $gte: startDate, $lte: now },
    user,
  }

  const transactions = await Transaction.find(query)

  let totalIncome = 0
  let totalExpense = 0

  transactions.forEach((tx) => {
    if (tx.type === "income") totalIncome += tx.amount
    else if (tx.type === "expense") totalExpense += tx.amount
  })

  const difference = totalIncome - totalExpense

  return {
    period,
    totalIncome,
    totalExpense,
    difference,
  }
}

const getRecentTransactions = async (user) => {
  const transactions = await Transaction.find({ user })
    .populate({
      path: "category",
      select: "name icon color",
      options: { includeDeleted: true },
    })
    .sort({ date: -1 })
    .limit(5)
  return transactions
}

const dashboardService = {
  getBalance,
  getSummary,
  getRecentTransactions,
}
export default dashboardService
