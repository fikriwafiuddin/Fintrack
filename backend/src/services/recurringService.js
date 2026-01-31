import RecurringTransaction from "../models/recurringTransactionModel.js"
import Transaction from "../models/transactionModel.js"
import Category from "../models/categoryModel.js"
import mongoose from "mongoose"
import { ErrorResponse } from "../utils/response.js"
import { updateBudgets } from "./transactionService.js"
import User from "../models/userModel.js"
import MonthlySummary from "../models/monthlySummaryModel.js"
import CategorySummary from "../models/categorySummaryModel.js"

/**
 * Helper function to calculate next occurrence date based on frequency
 * @param {Date} currentDate - Current occurrence date
 * @param {String} frequency - daily, weekly, monthly, yearly
 * @returns {Date} Next occurrence date
 */
function calculateNextOccurrence(currentDate, frequency) {
  const next = new Date(currentDate)

  switch (frequency) {
    case "daily":
      next.setDate(next.getDate() + 1)
      break
    case "weekly":
      next.setDate(next.getDate() + 7)
      break
    case "monthly":
      // Handle month overflow (e.g., Jan 31 -> Feb 28)
      const currentDay = next.getDate()
      next.setMonth(next.getMonth() + 1)
      // If day changed (overflow), set to last day of previous month
      if (next.getDate() !== currentDay) {
        next.setDate(0)
      }
      break
    case "yearly":
      next.setFullYear(next.getFullYear() + 1)
      // Handle Feb 29 leap year edge case
      if (next.getMonth() !== currentDate.getMonth()) {
        next.setDate(0)
      }
      break
    default:
      throw new Error("Invalid frequency")
  }

  return next
}

/**
 * Helper function untuk update summaries (Monthly, Category, Balance)
 * Copied from transactionService to avoid circular dependency
 */
async function updateSummaries(userId, newTransaction, session) {
  const { amount, type, date, category } = newTransaction
  const month = date.getMonth()
  const year = date.getFullYear()

  // Update MonthlySummary
  let monthly = await MonthlySummary.findOne({
    user: userId,
    month,
    year,
  }).session(session)

  if (!monthly) {
    monthly = new MonthlySummary({
      user: userId,
      month,
      year,
      totalIncome: 0,
      totalExpense: 0,
    })
  }

  if (type === "income") {
    monthly.totalIncome += amount
  } else {
    monthly.totalExpense += amount
  }
  await monthly.save({ session })

  // Update CategorySummary
  let categorySummary = await CategorySummary.findOne({
    user: userId,
    month,
    year,
    type,
  }).session(session)

  if (!categorySummary) {
    categorySummary = new CategorySummary({
      user: userId,
      month,
      year,
      type,
      totalAmount: 0,
      categories: [],
    })
  }

  const categoryIndex = categorySummary.categories.findIndex(
    (c) => c.category.toString() === category.toString(),
  )

  if (categoryIndex !== -1) {
    categorySummary.categories[categoryIndex].amount += amount
  } else {
    categorySummary.categories.push({ category, amount })
  }

  categorySummary.totalAmount += amount
  await categorySummary.save({ session })

  // Update Balance User
  let userData = await User.findOne({ userId }).session(session)
  if (!userData) {
    userData = new User({ userId })
  }

  if (type === "income") {
    userData.balance += amount
  } else {
    userData.balance -= amount
  }
  await userData.save({ session })
}

/**
 * Process all pending recurring transactions for a user (Lazy Evaluation)
 * This should be called when user accesses the dashboard
 * @param {String} user - User ID
 */
const processRecurrings = async (user) => {
  const today = new Date()
  today.setHours(23, 59, 59, 999) // End of today

  // Find all active recurring transactions that are due
  const pendingRecurrings = await RecurringTransaction.find({
    user,
    status: "active",
    nextOccurrence: { $lte: today },
  })

  if (pendingRecurrings.length === 0) {
    return { processed: 0 }
  }

  const session = await mongoose.startSession()
  session.startTransaction()

  try {
    let processedCount = 0

    for (const recurring of pendingRecurrings) {
      // Process all missed occurrences (backfill)
      let currentOccurrence = new Date(recurring.nextOccurrence)

      while (currentOccurrence <= today) {
        // Create the transaction
        const [transaction] = await Transaction.create(
          [
            {
              user,
              amount: recurring.amount,
              category: recurring.category,
              type: recurring.type,
              date: currentOccurrence,
              notes: recurring.notes
                ? `[Auto] ${recurring.notes}`
                : "[Auto] Recurring transaction",
            },
          ],
          { session },
        )

        // Update summaries
        await updateSummaries(user, transaction, session)

        // Update budgets
        await updateBudgets(user, transaction, session)

        processedCount++

        // Calculate next occurrence
        currentOccurrence = calculateNextOccurrence(
          currentOccurrence,
          recurring.frequency,
        )
      }

      // Update the recurring transaction with new nextOccurrence
      recurring.nextOccurrence = currentOccurrence
      recurring.lastExecuted = new Date()
      await recurring.save({ session })
    }

    await session.commitTransaction()
    return { processed: processedCount }
  } catch (error) {
    await session.abortTransaction()
    throw error
  } finally {
    session.endSession()
  }
}

const create = async (data, user) => {
  const { type, amount, category, frequency, startDate, notes } = data

  // Check category exists and belongs to user
  const categoryIsExist = await Category.findOne({ _id: category })
  if (
    !categoryIsExist ||
    (categoryIsExist.user &&
      categoryIsExist.user.toString() !== user.toString())
  ) {
    throw new ErrorResponse("Category not found", 404, {
      category: ["Category not found"],
    })
  }

  // Check type category matches
  if (categoryIsExist.type !== type && categoryIsExist.type !== "both") {
    throw new ErrorResponse("Category type does not match", 400, {
      category: ["Category type does not match"],
      type: ["Category type does not match"],
    })
  }

  const recurring = await RecurringTransaction.create({
    user,
    amount,
    category,
    type,
    frequency,
    nextOccurrence: new Date(startDate),
    notes,
  })

  return recurring
}

const update = async (data, user) => {
  const { id, type, amount, category, frequency, status, notes } = data

  // Check recurring exists
  const recurring = await RecurringTransaction.findOne({ _id: id, user })
  if (!recurring) {
    throw new ErrorResponse("Recurring transaction not found", 404)
  }

  // Check category if changed
  if (recurring.category.toString() !== category) {
    const categoryIsExist = await Category.findById(category)
    if (
      !categoryIsExist ||
      (categoryIsExist.user &&
        categoryIsExist.user.toString() !== user.toString())
    ) {
      throw new ErrorResponse("Category not found", 404)
    }

    if (categoryIsExist.type !== type && categoryIsExist.type !== "both") {
      throw new ErrorResponse("Category type does not match", 400, {
        category: ["Category type does not match"],
        type: ["Category type does not match"],
      })
    }
  }

  recurring.amount = amount
  recurring.category = category
  recurring.type = type
  recurring.frequency = frequency
  recurring.status = status
  recurring.notes = notes

  await recurring.save()
  return recurring
}

const updateStatus = async (id, user) => {
  const recurring = await RecurringTransaction.findOne({ _id: id, user })
  if (!recurring) {
    throw new ErrorResponse("Recurring transaction not found", 404)
  }

  recurring.status = recurring.status === "active" ? "paused" : "active"
  await recurring.save()

  return recurring
}

const remove = async (id, user) => {
  const recurring = await RecurringTransaction.findOne({ _id: id, user })
  if (!recurring) {
    throw new ErrorResponse("Recurring transaction not found", 404)
  }

  await recurring.deleteOne()
  return recurring
}

const getAll = async (request, user) => {
  const { status } = request

  const filter = { user }
  if (status !== "all") {
    filter.status = status
  }

  const recurrings = await RecurringTransaction.find(filter)
    .populate({
      path: "category",
      select: "name icon color",
      options: { includeDeleted: true },
    })
    .sort({ createdAt: -1 })
    .lean()

  return recurrings
}

const recurringService = {
  create,
  update,
  updateStatus,
  remove,
  getAll,
  processRecurrings,
}
export default recurringService
