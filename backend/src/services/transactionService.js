import transactionValidation from "../validations/transactionValidation.js"
import validation from "../validations/validation.js"
import Transaction from "../models/transactionModel.js"
import MonthlySummary from "../models/monthlySummaryModel.js"
import CategorySummary from "../models/categorySummaryModel.js"
import Category from "../models/categoryModel.js"
import mongoose from "mongoose"
import { ErrorResponse } from "../utils/response.js"
import User from "../models/userModel.js"
import Budget from "../models/budgetModel.js"

/**
 * Helper function untuk update summaries (Monthly, Category, Balance)
 * @param {String} userId - ID user pemilik transaksi
 * @param {Object|null} newTransaction - Data transaksi baru (null jika delete)
 * @param {Object} session - Mongoose session untuk transaction
 * @param {Object|null} oldTransaction - Data transaksi lama untuk rollback
 */
async function updateSummaries(
  userId,
  newTransaction,
  session,
  oldTransaction = null
) {
  // ========================================
  // STEP 1: ROLLBACK TRANSAKSI LAMA
  // ========================================
  if (oldTransaction) {
    const oldMonth = oldTransaction.date.getMonth()
    const oldYear = oldTransaction.date.getFullYear()

    // 1.1 Rollback MonthlySummary
    const oldMonthly = await MonthlySummary.findOne({
      user: userId,
      month: oldMonth,
      year: oldYear,
    }).session(session)

    if (oldMonthly) {
      if (oldTransaction.type === "income") {
        oldMonthly.totalIncome -= oldTransaction.amount
      } else {
        oldMonthly.totalExpense -= oldTransaction.amount
      }
      await oldMonthly.save({ session })
    }

    // 1.2 Rollback CategorySummary
    const oldCategorySummary = await CategorySummary.findOne({
      user: userId,
      month: oldMonth,
      year: oldYear,
      type: oldTransaction.type,
    }).session(session)

    if (oldCategorySummary) {
      const categoryIndex = oldCategorySummary.categories.findIndex(
        (c) => c.category.toString() === oldTransaction.category.toString()
      )

      if (categoryIndex !== -1) {
        oldCategorySummary.categories[categoryIndex].amount -=
          oldTransaction.amount

        // Hapus kategori jika amount jadi 0 atau negatif
        if (oldCategorySummary.categories[categoryIndex].amount <= 0) {
          oldCategorySummary.categories.splice(categoryIndex, 1)
        }
      }

      oldCategorySummary.totalAmount -= oldTransaction.amount
      await oldCategorySummary.save({ session })
    }

    // 1.3 Rollback Balance User
    const userForRollback = await User.findOne({ userId }).session(session)
    if (userForRollback) {
      if (oldTransaction.type === "income") {
        userForRollback.balance -= oldTransaction.amount
      } else {
        userForRollback.balance += oldTransaction.amount
      }
      await userForRollback.save({ session })
    }
  }

  // ========================================
  // STEP 2: APPLY TRANSAKSI BARU
  // ========================================
  // Jika newTransaction === null, berarti operasi DELETE
  // Hanya rollback saja, tidak perlu apply transaksi baru
  if (!newTransaction) {
    return
  }

  const { amount, type, date, category } = newTransaction
  const month = date.getMonth()
  const year = date.getFullYear()

  // 2.1 Update MonthlySummary
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

  // 2.2 Update CategorySummary
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
    (c) => c.category.toString() === category.toString()
  )

  if (categoryIndex !== -1) {
    categorySummary.categories[categoryIndex].amount += amount
  } else {
    categorySummary.categories.push({ category, amount })
  }

  categorySummary.totalAmount += amount
  await categorySummary.save({ session })

  // 2.3 Update Balance User
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
 * Update budget spent values when transactions are created, updated, or deleted
 * @param {String} user - User ID
 * @param {Object|null} newTransaction - The new transaction (for create/update)
 * @param {Object} session - Mongoose session
 * @param {Object|null} oldTransaction - The old transaction (for update/delete)
 */
export const updateBudgets = async (
  user,
  newTransaction,
  session,
  oldTransaction = null
) => {
  // Helper untuk update satu transaksi
  const applyBudgetChange = async (trx, sign) => {
    if (!trx || trx.type !== "expense") return // only expenses affect the budget

    // Search for active budgets by category and transaction date
    const budget = await Budget.findOne({
      user,
      category: trx.category,
      startDate: { $lte: trx.date },
      endDate: { $gte: trx.date },
    }).session(session)

    if (budget) {
      budget.spent += sign * trx.amount
      // Make sure the spent is not negative
      if (budget.spent < 0) budget.spent = 0
      await budget.save({ session })
    }
  }

  // If there is an oldTransaction → it means update or delete
  if (oldTransaction) {
    await applyBudgetChange(oldTransaction, -1) // remove old influences
  }

  // If there is a newTransaction → it means create or update
  if (newTransaction) {
    await applyBudgetChange(newTransaction, 1) // add new influences
  }
}

const create = async (request, user) => {
  const { type, amount, category, date, notes } = validation(
    transactionValidation.create,
    request
  )

  // 1. Check category
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

  //   2. Check type category
  if (categoryIsExist.type !== type && categoryIsExist.type !== "both") {
    throw new ErrorResponse("Category type does not match", 400, {
      category: ["Category type does not match"],
      type: ["Category type does not match"],
    })
  }

  // 3. Start a session for transaction
  const session = await mongoose.startSession()
  session.startTransaction()
  try {
    // 4. Create transaction
    const [transaction] = await Transaction.create(
      [{ user, type, amount, category, date, notes }],
      { session }
    )

    // 5. Update summaries
    await updateSummaries(user, transaction, session)

    // 6. Update budgets
    await updateBudgets(user, transaction, session)

    // 7. Commit transaction
    await session.commitTransaction()
    return transaction
  } catch (error) {
    await session.abortTransaction()
    throw error
  } finally {
    session.endSession()
  }
}

const update = async (request, user) => {
  const { id, type, amount, category, date, notes } = validation(
    transactionValidation.update,
    request
  )

  // 1. Check transaction
  const transaction = await Transaction.findOne({ _id: id, user })
  if (!transaction) {
    throw new ErrorResponse("Transaction not found", 404)
  }

  // 2. Start a session for transaction
  const session = await mongoose.startSession()
  session.startTransaction()
  try {
    // 4. Assign old transaction
    const oldTransaction = {
      _id: transaction._id,
      amount: transaction.amount,
      category: transaction.category,
      type: transaction.type,
      date: transaction.date,
      notes: transaction.notes,
    }

    // 3. Check if category changes
    if (transaction.category !== category) {
      // 3.1 Check category
      const categoryIsExist = await Category.findById(category)
      if (
        !categoryIsExist ||
        (categoryIsExist.user &&
          categoryIsExist.user.toString() !== user.toString())
      ) {
        throw new ErrorResponse("Category not found", 404)
      }

      //   3.2 Check type category
      if (categoryIsExist.type !== type && categoryIsExist.type !== "both") {
        throw new ErrorResponse("Category type does not match", 400, {
          category: ["Category type does not match"],
          type: ["Category type does not match"],
        })
      }

      // 3.3 Change category on transaction
      transaction.category = category
    }

    // 4. Change data transaction
    transaction.type = type
    transaction.amount = amount
    transaction.date = date
    transaction.notes = notes

    // 4. Update summaries
    await updateSummaries(user, transaction, session, oldTransaction)

    // 5. Update budgets
    await updateBudgets(user, transaction, session, oldTransaction)

    // 6. Save transaction changes
    await transaction.save({ session })

    // 7. Commit session
    await session.commitTransaction()
    return transaction
  } catch (error) {
    await session.abortTransaction()
    throw error
  } finally {
    session.endSession()
  }
}

const remove = async (request, user) => {
  const { id } = validation(transactionValidation.remove, request)

  // 1. Check transaction
  const transaction = await Transaction.findOne({ _id: id, user })
  if (!transaction) {
    throw new ErrorResponse("Transaction not found", 404)
  }

  // 2. Start a session for transaction
  const session = await mongoose.startSession()
  session.startTransaction()
  try {
    // 3. Update summaries
    await updateSummaries(user, null, session, transaction)

    // 4. Update budgets
    await updateBudgets(user, null, session, transaction)

    // 5. Delete transaction
    await transaction.deleteOne({ session })

    // 6. Commit transaction
    await session.commitTransaction()
    return transaction
  } catch (error) {
    await session.abortTransaction()
    throw error
  } finally {
    session.endSession()
  }
}

const getAll = async (request, user) => {
  const { type = "all", category = "all", sort = "asc" } = request

  const filter = {
    user,
  }
  if (type !== "all") filter.type = type
  if (category !== "all") filter.category = category

  const transactions = await Transaction.find(filter)
    .sort({ date: sort === "asc" ? 1 : -1 })
    .populate({
      path: "category",
      select: "name icon color",
      options: { includeDeleted: true },
    })
    .select("amount category type date notes createdAt")
    .lean()
  return transactions
}

const transactionService = {
  create,
  update,
  remove,
  getAll,
}
export default transactionService
