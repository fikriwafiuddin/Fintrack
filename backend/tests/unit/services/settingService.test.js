import { describe, expect, it, beforeEach } from "vitest"
import settingService from "../../../src/services/settingService.js"
import User from "../../../src/models/userModel.js"

describe("settingService", () => {
  let userId = "test-user-id"

  beforeEach(async () => {
    // MongoDB Memory Server will be cleared by setup.js
  })

  describe("show", () => {
    it("should return existing user preference", async () => {
      await User.create({ userId, currency: "USD" })
      const result = await settingService.show(userId)
      expect(result.currency).toBe("USD")
    })

    it("should create and return default preference if user not found", async () => {
      const result = await settingService.show(userId)
      expect(result.currency).toBe("IDR") // Default in userModel
      const inDb = await User.findOne({ userId })
      expect(inDb).not.toBeNull()
    })
  })

  describe("update", () => {
    it("should update user currency preference", async () => {
      await User.create({ userId, currency: "IDR" })
      const result = await settingService.update({ currency: "EUR" }, userId)
      expect(result.currency).toBe("EUR")
      const inDb = await User.findOne({ userId })
      expect(inDb.currency).toBe("EUR")
    })

    it("should create and update if user not found", async () => {
      const result = await settingService.update({ currency: "JPY" }, userId)
      expect(result.currency).toBe("JPY")
      const inDb = await User.findOne({ userId })
      expect(inDb.currency).toBe("JPY")
    })
  })
})
