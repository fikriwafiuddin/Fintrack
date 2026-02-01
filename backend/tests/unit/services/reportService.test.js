import { describe, expect, it } from "vitest"
import reportService from "../../../src/services/reportService.js"
import Category from "../../../src/models/categoryModel.js"
import CategorySummary from "../../../src/models/categorySummaryModel.js"
import MonthlySummary from "../../../src/models/monthlySummaryModel.js"
import Transaction from "../../../src/models/transactionModel.js"

describe("reportService", () => {
  let userId = "test-user-id"

  describe("getSummary", () => {
    it("should return category breakdown for a given month and year", async () => {
      const category = await Category.create({
        name: "Food",
        type: "expense",
        color: "#FF0000",
      })

      await CategorySummary.create({
        user: userId,
        month: 0, // Jan
        year: 2024,
        type: "expense",
        totalAmount: 1000,
        categories: [
          {
            category: category._id,
            amount: 500,
          },
        ],
      })

      await Transaction.create({
        user: userId,
        amount: 500,
        type: "expense",
        date: new Date(2024, 0, 15),
        category: category._id,
      })

      const summary = await reportService.getSummary(
        { month: "0", year: "2024" },
        userId,
      )

      expect(summary.totalExpense).toBe(1000)
      expect(summary.expenseCategoryBreakdown.length).toBe(1)
      expect(summary.expenseCategoryBreakdown[0].percentage).toBe(50)
      expect(summary.totalTransactions).toBe(1)
    })
  })

  describe("getLast6MonthsSummary", () => {
    it("should return comparison data for the last 6 months", async () => {
      const now = new Date()
      const currentMonth = now.getMonth()
      const currentYear = now.getFullYear()

      await MonthlySummary.create({
        user: userId,
        month: currentMonth,
        year: currentYear,
        totalIncome: 1000,
        totalExpense: 800,
      })

      const comparison = await reportService.getLast6MonthsSummary(userId)

      expect(comparison.length).toBe(6)
      const currentMonthData = comparison.find((c) =>
        c.month.includes(currentYear.toString()),
      )
      // Note: monthNames[currentMonth] check
      expect(currentMonthData).toBeDefined()
    })
  })
})
