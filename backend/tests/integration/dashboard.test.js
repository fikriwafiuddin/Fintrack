import { describe, expect, it, beforeEach } from "vitest"
import request from "supertest"
import app from "../../src/app.js"
import User from "../../src/models/userModel.js"
import Transaction from "../../src/models/transactionModel.js"
import Category from "../../src/models/categoryModel.js"

describe("Dashboard Routes Integration", () => {
  let userId = "test-user-id"

  describe("GET /dashboard/balance", () => {
    it("should return user balance", async () => {
      await User.create({ userId, balance: 1250 })

      const response = await request(app).get("/dashboard/balance")

      expect(response.status).toBe(200)
      expect(response.body.data.balance).toBe(1250)
    })
  })

  describe("GET /dashboard/summary", () => {
    it("should return transaction summary for the week", async () => {
      const category = await Category.create({
        name: "Food",
        type: "expense",
        color: "#FF0000",
      })
      await Transaction.create({
        user: userId,
        amount: 300,
        type: "expense",
        date: new Date(),
        category: category._id,
      })

      const response = await request(app)
        .get("/dashboard/summary")
        .query({ period: "week" })

      expect(response.status).toBe(200)
      expect(response.body.data.summary.totalExpense).toBe(300)
    })
  })

  describe("GET /dashboard/recent-transactions", () => {
    it("should return list of recent transactions", async () => {
      const category = await Category.create({
        name: "Food",
        type: "expense",
        color: "#FF0000",
      })
      await Transaction.create({
        user: userId,
        amount: 100,
        type: "expense",
        date: new Date(),
        category: category._id,
      })

      const response = await request(app).get("/dashboard/recent-transactions")

      expect(response.status).toBe(200)
      expect(Array.isArray(response.body.data.transactions)).toBe(true)
      expect(response.body.data.transactions.length).toBe(1)
    })
  })
})
