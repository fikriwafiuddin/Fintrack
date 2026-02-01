import { describe, expect, it, beforeEach, vi, afterEach } from "vitest"
import recurringService from "../../../src/services/recurringService.js"
import Category from "../../../src/models/categoryModel.js"
import RecurringTransaction from "../../../src/models/recurringTransactionModel.js"
import Transaction from "../../../src/models/transactionModel.js"
import User from "../../../src/models/userModel.js"

describe("recurringService", () => {
  let userId = "test-user-id"
  let categoryId

  beforeEach(async () => {
    const category = await Category.create({
      name: "Salary",
      type: "income",
      user: userId,
      icon: "cash",
      color: "#00FF00",
    })
    categoryId = category._id

    await User.create({ userId, balance: 0 })

    // Default system time for tests
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  describe("create", () => {
    it("should create a recurring transaction successfully", async () => {
      const data = {
        type: "income",
        amount: 1000,
        category: categoryId.toString(),
        frequency: "monthly",
        startDate: new Date(),
        notes: "Monthly salary",
      }

      const result = await recurringService.create(data, userId)

      expect(result).toBeDefined()
      expect(result.amount).toBe(1000)
    })
  })

  describe("processRecurrings (Lazy Evaluation)", () => {
    it("should process a single due transaction and update nextOccurrence", async () => {
      const jan31 = new Date(2024, 0, 31)
      vi.setSystemTime(jan31)

      const recurring = await RecurringTransaction.create({
        user: userId,
        amount: 100,
        category: categoryId,
        type: "income",
        frequency: "monthly",
        nextOccurrence: jan31,
      })

      // Simulation: Today is Feb 1st
      vi.setSystemTime(new Date(2024, 1, 1))

      const result = await recurringService.processRecurrings(userId)
      expect(result.processed).toBe(1)

      const updated = await RecurringTransaction.findById(recurring._id)
      // Next should be Feb 29 (Leap year)
      expect(updated.nextOccurrence.getMonth()).toBe(1)
      expect(updated.nextOccurrence.getDate()).toBe(29)
    })

    it("should handle multiple missed occurrences (backfill)", async () => {
      const monday = new Date(2024, 0, 1) // Monday
      vi.setSystemTime(monday)

      await RecurringTransaction.create({
        user: userId,
        amount: 100,
        category: categoryId,
        type: "income",
        frequency: "daily",
        nextOccurrence: monday,
      })

      // Simulation: Today is Thursday (4 days of transactions: Mon, Tue, Wed, Thu)
      vi.setSystemTime(new Date(2024, 0, 4))

      const result = await recurringService.processRecurrings(userId)
      expect(result.processed).toBe(4)

      const transactions = await Transaction.find({ user: userId })
      expect(transactions.length).toBe(4)
    })

    it("should handle leap year Feb 29 -> Feb 28", async () => {
      const leapFeb29 = new Date(2024, 1, 29)
      vi.setSystemTime(leapFeb29)

      const recurring = await RecurringTransaction.create({
        user: userId,
        amount: 1000,
        category: categoryId,
        type: "income",
        frequency: "yearly",
        nextOccurrence: leapFeb29,
      })

      // Simulation: Today is after that date
      vi.setSystemTime(new Date(2024, 2, 1))

      await recurringService.processRecurrings(userId)

      const updated = await RecurringTransaction.findById(recurring._id)
      // Next for Feb 29 2024 in yearly is Feb 28 2025
      expect(updated.nextOccurrence.getFullYear()).toBe(2025)
      expect(updated.nextOccurrence.getMonth()).toBe(1)
      expect(updated.nextOccurrence.getDate()).toBe(28)
    })

    it("should correctly handle month end Jan 31 -> Feb 29 -> Mar 31", async () => {
      const jan31 = new Date(2024, 0, 31)
      vi.setSystemTime(jan31)

      const recurring = await RecurringTransaction.create({
        user: userId,
        amount: 100,
        category: categoryId,
        type: "income",
        frequency: "monthly",
        nextOccurrence: jan31,
      })

      // 1. Process Jan 31
      vi.setSystemTime(new Date(2024, 1, 1))
      await recurringService.processRecurrings(userId)
      let updated = await RecurringTransaction.findById(recurring._id)
      expect(updated.nextOccurrence.getDate()).toBe(29)

      // 2. Process Feb 29
      vi.setSystemTime(new Date(2024, 2, 1))
      await recurringService.processRecurrings(userId)
      updated = await RecurringTransaction.findById(recurring._id)
      expect(updated.nextOccurrence.getDate()).toBe(31)
    })
  })

  // Re-include basic CRUD tests to ensure complete coverage
  describe("CRUD operations", () => {
    it("should update recurring transaction", async () => {
      const recurring = await RecurringTransaction.create({
        user: userId,
        amount: 100,
        category: categoryId,
        type: "income",
        frequency: "daily",
        nextOccurrence: new Date(),
      })
      const result = await recurringService.update(
        {
          id: recurring._id.toString(),
          amount: 200,
          category: categoryId.toString(),
          type: "income",
          frequency: "daily",
          status: "active",
        },
        userId,
      )
      expect(result.amount).toBe(200)
    })

    it("should delete recurring transaction", async () => {
      const recurring = await RecurringTransaction.create({
        user: userId,
        amount: 100,
        category: categoryId,
        type: "income",
        frequency: "daily",
        nextOccurrence: new Date(),
      })
      await recurringService.remove(recurring._id, userId)
      const inDb = await RecurringTransaction.findById(recurring._id)
      expect(inDb).toBeNull()
    })
  })
})
