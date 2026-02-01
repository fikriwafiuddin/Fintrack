import { describe, expect, it, beforeEach } from "vitest"
import request from "supertest"
import app from "../../src/app.js"
import Category from "../../src/models/categoryModel.js"
import Budget from "../../src/models/budgetModel.js"

describe("Budget Routes Integration", () => {
  let userId = "test-user-id"
  let categoryId

  beforeEach(async () => {
    const category = await Category.create({
      name: "Food",
      type: "expense",
      user: userId,
      color: "#FF0000",
    })
    categoryId = category._id.toString()
  })

  describe("POST /budgets", () => {
    it("should create a new budget successfully", async () => {
      const payload = {
        category: categoryId,
        amount: 500,
        period: "monthly",
        startDate: "2024-01-01",
        endDate: "2024-01-31",
      }

      const response = await request(app).post("/budgets").send(payload)

      expect(response.status).toBe(201)
      expect(response.body.success).toBe(true)
      expect(response.body.data.budget.amount).toBe(payload.amount)
      expect(response.body.data.budget.user).toBe(userId)
    })

    describe("Validation Failures", () => {
      it("should return 400 if amount is negative", async () => {
        const payload = {
          category: categoryId,
          amount: -100,
          period: "monthly",
          startDate: "2024-01-01",
          endDate: "2024-01-31",
        }
        const response = await request(app).post("/budgets").send(payload)
        expect(response.status).toBe(400)
      })

      it("should return 400 if end date is before start date", async () => {
        const payload = {
          category: categoryId,
          amount: 100,
          period: "monthly",
          startDate: "2024-01-31",
          endDate: "2024-01-01",
        }
        const response = await request(app).post("/budgets").send(payload)
        expect(response.status).toBe(400)
      })

      it("should return 400 if period is invalid", async () => {
        const payload = {
          category: categoryId,
          amount: 100,
          period: "daily", // Invalid period
          startDate: "2024-01-01",
          endDate: "2024-01-31",
        }
        const response = await request(app).post("/budgets").send(payload)
        expect(response.status).toBe(400)
      })
    })

    describe("Business Logic Failures", () => {
      it("should return 400 if overlapping budget exists", async () => {
        // Create first budget
        await Budget.create({
          user: userId,
          category: categoryId,
          amount: 500,
          period: "monthly",
          startDate: new Date("2024-01-01"),
          endDate: new Date("2024-01-31"),
        })

        // Try to create overlapping budget
        const payload = {
          category: categoryId,
          amount: 1000,
          period: "monthly",
          startDate: "2024-01-15",
          endDate: "2024-02-15",
        }

        const response = await request(app).post("/budgets").send(payload)
        expect(response.status).toBe(400)
        expect(response.body.message).toContain("Overlapping")
      })
    })
  })

  describe("PUT /budgets/:id", () => {
    it("should update an existing budget", async () => {
      const budget = await Budget.create({
        user: userId,
        category: categoryId,
        amount: 500,
        period: "monthly",
        startDate: new Date("2024-01-01"),
        endDate: new Date("2024-01-31"),
      })

      const payload = {
        category: categoryId,
        amount: 700,
        period: "monthly",
        startDate: "2024-01-01",
        endDate: "2024-01-31",
      }

      const response = await request(app)
        .put(`/budgets/${budget._id}`)
        .send(payload)

      expect(response.status).toBe(200)
      expect(response.body.data.budget.amount).toBe(700)
    })
  })

  describe("GET /budgets", () => {
    it("should return budgets within a date range", async () => {
      await Budget.create({
        user: userId,
        category: categoryId,
        amount: 100,
        period: "monthly",
        startDate: new Date("2024-01-01"),
        endDate: new Date("2024-01-31"),
      })

      const response = await request(app).get("/budgets").query({
        startDate: "2024-01-01",
        endDate: "2024-01-31",
      })

      expect(response.status).toBe(200)
      expect(response.body.data.budgets.length).toBeGreaterThanOrEqual(1)
    })
  })

  describe("DELETE /budgets/:id", () => {
    it("should delete a budget successfully", async () => {
      const budget = await Budget.create({
        user: userId,
        category: categoryId,
        amount: 500,
        period: "monthly",
        startDate: new Date("2024-01-01"),
        endDate: new Date("2024-01-31"),
      })

      const response = await request(app).delete(`/budgets/${budget._id}`)

      expect(response.status).toBe(200)

      const inDb = await Budget.findById(budget._id)
      expect(inDb).toBeNull()
    })
  })
})
