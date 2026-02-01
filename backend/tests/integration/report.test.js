import { describe, expect, it } from "vitest"
import request from "supertest"
import app from "../../src/app.js"
import Category from "../../src/models/categoryModel.js"
import CategorySummary from "../../src/models/categorySummaryModel.js"

describe("Report Routes Integration", () => {
  let userId = "test-user-id"

  describe("GET /report/summary", () => {
    it("should return report summary for specified month", async () => {
      const category = await Category.create({
        name: "Food",
        type: "expense",
        color: "#FF0000",
      })
      await CategorySummary.create({
        user: userId,
        month: 0,
        year: 2024,
        type: "expense",
        totalAmount: 100,
        categories: [{ category: category._id, amount: 100 }],
      })

      const response = await request(app)
        .get("/report/summary")
        .query({ month: "0", year: "2024" })

      expect(response.status).toBe(200)
      expect(response.body.data.totalExpense).toBe(100)
      expect(response.body.data.expenseCategoryBreakdown.length).toBe(1)
    })
  })

  describe("GET /report/tren-6-monsths", () => {
    it("should return trend data for last 6 months", async () => {
      const response = await request(app).get("/report/tren-6-monsths")

      expect(response.status).toBe(200)
      expect(Array.isArray(response.body.data)).toBe(true)
      expect(response.body.data.length).toBe(6)
    })
  })
})
