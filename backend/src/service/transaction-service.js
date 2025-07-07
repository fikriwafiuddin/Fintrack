import { request } from "express"
import ResponseError from "../error/error-response.js"
import Category from "../models/category-model.js"
import Transaction from "../models/transaction-model.js"
import User from "../models/user-model.js"
import transactionValidation from "../validations/transaction-validation.js"
import validation from "../validations/validation.js"

const create = async (request, userId) => {
  const { category, amount, type, date, note } = validation(
    transactionValidation.create,
    request
  )

  const existingCategory = await Category.findById(category)
  if (!existingCategory) {
    throw new ResponseError("Category not found", 404)
  }

  const transaction = new Transaction({
    user: userId,
    category,
    amount,
    type,
    date,
    note,
  })

  await transaction.save()
  await transaction.populate("category")

  if (type === "income") {
    await User.findByIdAndUpdate(userId, {
      $inc: { totalIncome: amount, balance: amount },
    })
  }

  if (type === "expense") {
    await User.findByIdAndUpdate(userId, {
      $inc: { totalExpense: amount, balance: -amount },
    })
  }
  return transaction
}

const all = async (type, userId) => {
  validation(transactionValidation.all, type)

  const transactions = await Transaction.find({ user: userId, type }).populate(
    "category"
  )
  return transactions
}

const remove = async (id, userId) => {
  validation(transactionValidation.remove, id)

  const deletedTransaction = await Transaction.findByIdAndDelete(id)
  if (!deletedTransaction) {
    throw new ResponseError("Transaction not found", 404)
  }

  if (deletedTransaction.type === "income") {
    await User.findByIdAndUpdate(userId, {
      $inc: {
        totalIncome: -deletedTransaction.amount,
        balance: -deletedTransaction.amount,
      },
    })
  }

  if (deletedTransaction.type === "expense") {
    await User.findByIdAndUpdate(userId, {
      $inc: {
        totalExpense: -deletedTransaction.amount,
        balance: deletedTransaction.amount,
      },
    })
  }

  return deletedTransaction
}

const update = async (request, userId) => {
  const { id, category, amount, date, note } = validation(
    transactionValidation.update,
    request
  )

  const transaction = await Transaction.findById(id)
  if (!transaction) {
    throw new ResponseError("Transaction not found", 404)
  }

  if (category !== transaction.category) {
    const existingCategory = await Category.findById(category)
    if (!existingCategory) {
      throw new ResponseError("Category not found", 404)
    }
  }

  if (transaction.type === "income") {
    await User.findByIdAndUpdate(userId, {
      $inc: {
        totalIncome: amount - transaction.amount,
        balance: amount - transaction.amount,
      },
    })
  }

  if (transaction.type === "expense") {
    await User.findByIdAndUpdate(userId, {
      $inc: {
        totalExpense: amount - transaction.amount,
        balance: transaction.amount - amount,
      },
    })
  }

  transaction.category = category
  transaction.amount = amount
  transaction.date = date
  transaction.note = note
  const updatedTransaction = await transaction.save()
  await updatedTransaction.populate("category")
  return updatedTransaction
}

export default {
  create,
  all,
  remove,
  update,
}
