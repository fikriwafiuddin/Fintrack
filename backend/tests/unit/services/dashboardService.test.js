import { describe, expect, it, beforeEach, vi } from "vitest"
import dashboardService from "../../../src/services/dashboardService.js"
import User from "../../../src/models/userModel.js"
import Transaction from "../../../src/models/transactionModel.js"
import Category from "../../../src/models/categoryModel.js"
import recurringService from "../../../src/services/recurringService.js"

// Mock recurringService
vi.mock("../../../src/services/recurringService.js", () => ({
  default: {
    processRecurrings: vi.fn(),
  },
}))

describe("dashboardService", () => {
  let userId = "test-user-id"

  describe("getBalance", () => {
    it("should process recurrings and return user balance", async () => {
      await User.create({ userId, balance: 1000 })

      const balance = await dashboardService.getBalance(userId)

      expect(recurringService.processRecurrings).toHaveBeenCalledWith(userId)
      expect(balance).toBe(1000)
    })

    it("should create user with 0 balance if not found", async () => {
      const balance = await dashboardService.getBalance(userId)
      expect(balance).toBe(0)
      const inDb = await User.findOne({ userId })
      expect(inDb).not.toBeNull()
    })
  })

  describe("getSummary", () => {
    it("should calculate summary for 'month' period", async () => {
      const category = await Category.create({
        name: "Food",
        type: "expense",
        color: "#FF0000",
      })

      const now = new Date()
      const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1)

      await Transaction.create([
        {
          user: userId,
          amount: 500,
          type: "income",
          date: now,
          category: category._id,
        },
        {
          user: userId,
          amount: 200,
          type: "expense",
          date: now,
          category: category._id,
        },
        {
          user: userId,
          amount: 100,
          type: "expense",
          date: startOfMonth,
          category: category._id,
        },
      ])

      const summary = await dashboardService.getSummary(
        { period: "month" },
        userId,
      )

      expect(summary.totalIncome).toBe(500)
      expect(summary.totalExpense).toBe(300)
      expect(summary.difference).toBe(200)
    })

    it("should throw error for invalid period", async () => {
      await expect(
        dashboardService.getSummary({ period: "year" }, userId),
      ).rejects.toThrow("Invalid period value")
    })
  })

  describe("getRecentTransactions", () => {
    it("should return top 5 recent transactions", async () => {
      const category = await Category.create({
        name: "Food",
        type: "expense",
        color: "#FF0000",
      })

      const txs = []
      for (let i = 0; i < 7; i++) {
        txs.push({
          user: userId,
          amount: 10 * (i + 1),
          type: "expense",
          date: new Date(2024, 0, i + 1),
          category: category._id,
        })
      }
      await Transaction.create(txs)

      const recent = await dashboardService.getRecentTransactions(userId)
      expect(recent.length).toBe(5)
      expect(recent[0].amount).toBe(70) // Sorted by date desc
    })
  })
})
