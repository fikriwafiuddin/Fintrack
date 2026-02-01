import { describe, expect, it, beforeEach } from "vitest"
import budgetService from "../../../src/services/budgetService.js"
import Category from "../../../src/models/categoryModel.js"
import Budget from "../../../src/models/budgetModel.js"
import mongoose from "mongoose"

describe("budgetService", () => {
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
  })

  describe("create", () => {
    it("should create a budget successfully", async () => {
      const data = {
        category: categoryId.toString(),
        amount: 500,
        period: "monthly",
        startDate: new Date("2024-01-01"),
        endDate: new Date("2024-01-31"),
      }

      const result = await budgetService.create(data, userId)

      expect(result).toBeDefined()
      expect(result.amount).toBe(500)
      expect(result.user).toBe(userId)
    })

    it("should throw error if category not found", async () => {
      const data = {
        category: new mongoose.Types.ObjectId().toString(),
        amount: 500,
        period: "monthly",
        startDate: new Date("2024-01-01"),
        endDate: new Date("2024-01-31"),
      }

      await expect(budgetService.create(data, userId)).rejects.toThrow(
        "Category not found",
      )
    })

    it("should throw error if category type is income", async () => {
      const incomeCategory = await Category.create({
        name: "Salary",
        type: "income",
        user: userId,
        color: "#00FF00",
      })

      const data = {
        category: incomeCategory._id.toString(),
        amount: 500,
        period: "monthly",
        startDate: new Date("2024-01-01"),
        endDate: new Date("2024-01-31"),
      }

      await expect(budgetService.create(data, userId)).rejects.toThrow(
        "Category type is income",
      )
    })

    it("should throw error if budget overlaps with existing budget", async () => {
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
      const data = {
        category: categoryId.toString(),
        amount: 1000,
        period: "monthly",
        startDate: new Date("2024-01-15"),
        endDate: new Date("2024-02-15"),
      }

      await expect(budgetService.create(data, userId)).rejects.toThrow(
        "Overlapping time span with other budgets",
      )
    })
  })

  describe("update", () => {
    it("should update an existing budget", async () => {
      const budget = await Budget.create({
        user: userId,
        category: categoryId,
        amount: 500,
        period: "monthly",
        startDate: new Date("2024-01-01"),
        endDate: new Date("2024-01-31"),
      })

      const updateData = {
        id: budget._id.toString(),
        category: categoryId.toString(),
        amount: 700,
        period: "monthly",
        startDate: new Date("2024-01-01"),
        endDate: new Date("2024-01-31"),
      }

      const result = await budgetService.update(updateData, userId)
      expect(result.amount).toBe(700)
    })

    it("should throw error if updated budget overlaps with another", async () => {
      // Budget A
      await Budget.create({
        user: userId,
        category: categoryId,
        amount: 500,
        period: "monthly",
        startDate: new Date("2024-01-01"),
        endDate: new Date("2024-01-31"),
      })

      // Budget B
      const budgetB = await Budget.create({
        user: userId,
        category: categoryId,
        amount: 500,
        period: "monthly",
        startDate: new Date("2024-02-01"),
        endDate: new Date("2024-02-29"),
      })

      // Update Budget B to overlap with A
      const updateData = {
        id: budgetB._id.toString(),
        category: categoryId.toString(),
        amount: 500,
        period: "monthly",
        startDate: new Date("2024-01-15"),
        endDate: new Date("2024-02-15"),
      }

      await expect(budgetService.update(updateData, userId)).rejects.toThrow(
        "Overlapping time span with other budgets",
      )
    })
  })

  describe("remove", () => {
    it("should delete a budget", async () => {
      const budget = await Budget.create({
        user: userId,
        category: categoryId,
        amount: 500,
        period: "monthly",
        startDate: new Date("2024-01-01"),
        endDate: new Date("2024-01-31"),
      })

      const result = await budgetService.remove(budget._id, userId)
      expect(result).toBeDefined()

      const inDb = await Budget.findById(budget._id)
      expect(inDb).toBeNull()
    })

    it("should throw error if budget not found during removal", async () => {
      await expect(
        budgetService.remove(new mongoose.Types.ObjectId(), userId),
      ).rejects.toThrow("Budget not found")
    })
  })

  describe("getAll", () => {
    it("should retrieve budgets within a date range", async () => {
      await Budget.create({
        user: userId,
        category: categoryId,
        amount: 100,
        period: "monthly",
        startDate: new Date("2024-01-01"),
        endDate: new Date("2024-01-31"),
      })

      const result = await budgetService.getAll(
        {
          startDate: new Date("2024-01-01"),
          endDate: new Date("2024-01-31"),
        },
        userId,
      )

      expect(result.budgets.length).toBe(1)
    })
  })
})
