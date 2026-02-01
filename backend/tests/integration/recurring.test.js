import { describe, expect, it, beforeEach } from "vitest"
import request from "supertest"
import app from "../../src/app.js"
import Category from "../../src/models/categoryModel.js"
import RecurringTransaction from "../../src/models/recurringTransactionModel.js"

describe("Recurring Routes Integration", () => {
  let userId = "test-user-id"
  let categoryId

  beforeEach(async () => {
    const category = await Category.create({
      name: "Utility",
      type: "expense",
      user: userId,
      icon: "lightbulb",
      color: "#FFFF00",
    })
    categoryId = category._id
  })

  describe("GET /recurrings", () => {
    it("should return all recurring transactions for the user", async () => {
      await RecurringTransaction.create({
        user: userId,
        amount: 50,
        category: categoryId,
        type: "expense",
        frequency: "monthly",
        nextOccurrence: new Date(),
      })

      const response = await request(app)
        .get("/recurrings")
        .query({ status: "all" })

      expect(response.status).toBe(200)
      expect(Array.isArray(response.body.data.recurrings)).toBe(true)
      expect(response.body.data.recurrings.length).toBe(1)
    })
  })

  describe("POST /recurrings", () => {
    it("should create a new recurring transaction", async () => {
      const payload = {
        type: "expense",
        amount: 100,
        category: categoryId.toString(),
        frequency: "weekly",
        startDate: new Date().toISOString(),
        notes: "Weekly Internet",
      }

      const response = await request(app).post("/recurrings").send(payload)

      expect(response.status).toBe(201)
      expect(response.body.data.recurring.amount).toBe(100)
    })
  })

  describe("PUT /recurrings/:id", () => {
    it("should update an existing recurring transaction", async () => {
      const recurring = await RecurringTransaction.create({
        user: userId,
        amount: 50,
        category: categoryId,
        type: "expense",
        frequency: "monthly",
        nextOccurrence: new Date(),
      })

      const payload = {
        type: "expense",
        amount: 75,
        category: categoryId.toString(),
        frequency: "weekly",
        status: "active",
        notes: "Updated cost",
      }

      const response = await request(app)
        .put(`/recurrings/${recurring._id}`)
        .send(payload)

      expect(response.status).toBe(200)
      expect(response.body.data.recurring.amount).toBe(75)
      expect(response.body.data.recurring.frequency).toBe("weekly")
    })
  })

  describe("PATCH /recurrings/:id/status", () => {
    it("should toggle the status of a recurring transaction", async () => {
      const recurring = await RecurringTransaction.create({
        user: userId,
        amount: 50,
        category: categoryId,
        type: "expense",
        frequency: "monthly",
        nextOccurrence: new Date(),
        status: "active",
      })

      const response = await request(app).patch(
        `/recurrings/${recurring._id}/status`,
      )

      expect(response.status).toBe(200)
      expect(response.body.data.recurring.status).toBe("paused")
    })
  })

  describe("DELETE /recurrings/:id", () => {
    it("should delete a recurring transaction", async () => {
      const recurring = await RecurringTransaction.create({
        user: userId,
        amount: 50,
        category: categoryId,
        type: "expense",
        frequency: "monthly",
        nextOccurrence: new Date(),
      })

      const response = await request(app).delete(`/recurrings/${recurring._id}`)

      expect(response.status).toBe(200)

      const inDb = await RecurringTransaction.findById(recurring._id)
      expect(inDb).toBeNull()
    })
  })
})
