import { describe, expect, it, beforeEach } from "vitest"
import request from "supertest"
import app from "../../src/app.js"
import Category from "../../src/models/categoryModel.js"
import Transaction from "../../src/models/transactionModel.js"
import User from "../../src/models/userModel.js"

describe("Transaction Routes Integration", () => {
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

    await User.create({ userId, balance: 1000 })
  })

  describe("POST /transactions", () => {
    it("should create a new transaction", async () => {
      const payload = {
        amount: 150,
        type: "expense",
        category: categoryId,
        date: new Date().toISOString(),
        notes: "Integration test",
      }

      const response = await request(app).post("/transactions").send(payload)

      expect(response.status).toBe(201)
      expect(response.body.success).toBe(true)
      expect(response.body.data.transaction.amount).toBe(150)

      const user = await User.findOne({ userId })
      expect(user.balance).toBe(850)
    })

    it("should return 400 if validation fails", async () => {
      const payload = {
        amount: -100, // Invalid amount
        type: "expense",
        category: categoryId,
        date: "invalid-date",
      }

      const response = await request(app).post("/transactions").send(payload)
      expect(response.status).toBe(400)
    })
  })

  describe("PUT /transactions/:id", () => {
    it("should update an existing transaction", async () => {
      const tx = await Transaction.create({
        user: userId,
        amount: 100,
        type: "expense",
        category: categoryId,
        date: new Date(),
      })

      const payload = {
        amount: 200,
        type: "expense",
        category: categoryId,
        date: new Date().toISOString(),
      }

      const response = await request(app)
        .put(`/transactions/${tx._id}`)
        .send(payload)

      expect(response.status).toBe(200)
      expect(response.body.data.transaction.amount).toBe(200)
    })
  })

  describe("GET /transactions", () => {
    it("should retrieve transactions with filters", async () => {
      await Transaction.create({
        user: userId,
        amount: 100,
        type: "expense",
        category: categoryId,
        date: new Date(),
      })

      const response = await request(app)
        .get("/transactions")
        .query({
          type: "all",
          startDate: new Date(
            new Date().getFullYear(),
            new Date().getMonth(),
            1,
          ).toISOString(),
          endDate: new Date(
            new Date().getFullYear(),
            new Date().getMonth() + 1,
            0,
          ).toISOString(),
        })

      expect(response.status).toBe(200)
      expect(response.body.data.transactions.length).toBe(1)
    })
  })

  describe("DELETE /transactions/:id", () => {
    it("should delete a transaction", async () => {
      const tx = await Transaction.create({
        user: userId,
        amount: 100,
        type: "expense",
        category: categoryId,
        date: new Date(),
      })

      const response = await request(app).delete(`/transactions/${tx._id}`)
      expect(response.status).toBe(200)

      const inDb = await Transaction.findById(tx._id)
      expect(inDb).toBeNull()
    })
  })
})
