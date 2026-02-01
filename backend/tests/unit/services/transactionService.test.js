import { describe, expect, it, beforeEach } from "vitest"
import transactionService from "../../../src/services/transactionService.js"
import Transaction from "../../../src/models/transactionModel.js"
import Category from "../../../src/models/categoryModel.js"
import User from "../../../src/models/userModel.js"
import MonthlySummary from "../../../src/models/monthlySummaryModel.js"
import CategorySummary from "../../../src/models/categorySummaryModel.js"
import Budget from "../../../src/models/budgetModel.js"
import mongoose from "mongoose"

describe("transactionService", () => {
  let userId = "test-user-id"
  let categoryId

  beforeEach(async () => {
    const category = await Category.create({
      name: "Food",
      type: "expense",
      user: userId,
      color: "#FF0000",
    })
    categoryId = category._id

    await User.create({ userId, balance: 1000 })
  })

  describe("create", () => {
    it("should create a transaction and update summaries and user balance", async () => {
      const data = {
        amount: 200,
        type: "expense",
        category: categoryId.toString(),
        date: new Date().toISOString(),
        notes: "Lunch",
      }

      const result = await transactionService.create(data, userId)

      expect(result).toBeDefined()
      expect(result.amount).toBe(200)

      // Check balance
      const user = await User.findOne({ userId })
      expect(user.balance).toBe(800)

      // Check MonthlySummary
      const date = new Date(data.date)
      const monthly = await MonthlySummary.findOne({
        user: userId,
        month: date.getMonth(),
        year: date.getFullYear(),
      })
      expect(monthly.totalExpense).toBe(200)

      // Check CategorySummary
      const catSummary = await CategorySummary.findOne({
        user: userId,
        month: date.getMonth(),
        year: date.getFullYear(),
        type: "expense",
      })
      expect(catSummary.totalAmount).toBe(200)
    })

    it("should update budget spent if matching budget exists", async () => {
      const date = new Date()
      const startDate = new Date(date.getFullYear(), date.getMonth(), 1)
      const endDate = new Date(date.getFullYear(), date.getMonth() + 1, 0)

      await Budget.create({
        user: userId,
        category: categoryId,
        amount: 1000,
        spent: 0,
        period: "monthly",
        startDate,
        endDate,
      })

      const data = {
        amount: 300,
        type: "expense",
        category: categoryId.toString(),
        date: date.toISOString(),
      }

      await transactionService.create(data, userId)

      const budget = await Budget.findOne({
        user: userId,
        category: categoryId,
      })
      expect(budget.spent).toBe(300)
    })

    it("should throw error if category is not found", async () => {
      const data = {
        amount: 100,
        type: "expense",
        category: new mongoose.Types.ObjectId().toString(),
        date: new Date().toISOString(),
      }

      await expect(transactionService.create(data, userId)).rejects.toThrow(
        "Category not found",
      )
    })

    it("should throw error if category type does not match", async () => {
      const data = {
        amount: 100,
        type: "income", // Category is 'expense'
        category: categoryId.toString(),
        date: new Date().toISOString(),
      }

      await expect(transactionService.create(data, userId)).rejects.toThrow(
        "Category type does not match",
      )
    })
  })

  describe("update", () => {
    it("should update transaction and adjust summaries", async () => {
      const date = new Date()
      const tx = await transactionService.create(
        {
          amount: 100,
          type: "expense",
          category: categoryId.toString(),
          date: date.toISOString(),
        },
        userId,
      )

      const updateData = {
        id: tx._id.toString(),
        amount: 150,
        type: "expense",
        category: categoryId.toString(),
        date: date.toISOString(),
      }

      const result = await transactionService.update(updateData, userId)
      expect(result.amount).toBe(150)

      const user = await User.findOne({ userId })
      expect(user.balance).toBe(850) // 1000 - 150
    })
  })

  describe("remove", () => {
    it("should remove transaction and rollback summaries", async () => {
      const tx = await transactionService.create(
        {
          amount: 100,
          type: "expense",
          category: categoryId.toString(),
          date: new Date().toISOString(),
        },
        userId,
      )

      await transactionService.remove(tx._id, userId)

      const user = await User.findOne({ userId })
      expect(user.balance).toBe(1000)

      const inDb = await Transaction.findById(tx._id)
      expect(inDb).toBeNull()
    })
  })

  describe("getAll", () => {
    it("should return paginated transactions", async () => {
      const date = new Date()
      await transactionService.create(
        {
          amount: 100,
          type: "expense",
          category: categoryId.toString(),
          date: date.toISOString(),
        },
        userId,
      )

      const result = await transactionService.getAll(
        {
          type: "all",
          category: "all",
          sort: "desc",
          startDate: new Date(
            date.getFullYear(),
            date.getMonth(),
            1,
          ).toISOString(),
          endDate: new Date(
            date.getFullYear(),
            date.getMonth() + 1,
            0,
          ).toISOString(),
          page: 1,
        },
        userId,
      )

      expect(result.transactions.length).toBe(1)
      expect(result.pagination.currentPage).toBe(1)
    })
  })
})
