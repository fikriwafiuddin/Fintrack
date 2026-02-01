import { describe, expect, it } from "vitest"
import request from "supertest"
import app from "../../src/app.js"
import User from "../../src/models/userModel.js"

describe("Setting Routes Integration", () => {
  let userId = "test-user-id"

  describe("GET /settings", () => {
    it("should return user preference", async () => {
      await User.create({ userId, currency: "USD" })

      const response = await request(app).get("/settings")

      expect(response.status).toBe(200)
      expect(response.body.success).toBe(true)
      expect(response.body.data.userPreference.currency).toBe("USD")
    })
  })

  describe("PUT /settings", () => {
    it("should update user preference successfully", async () => {
      await User.create({ userId, currency: "IDR" })

      const payload = { currency: "EUR" }
      const response = await request(app).put("/settings").send(payload)

      expect(response.status).toBe(200)
      expect(response.body.success).toBe(true)
      expect(response.body.data.userPreference.currency).toBe("EUR")

      const inDb = await User.findOne({ userId })
      expect(inDb.currency).toBe("EUR")
    })

    it("should return 400 if currency is invalid", async () => {
      const payload = { currency: "INVALID" }
      const response = await request(app).put("/settings").send(payload)

      expect(response.status).toBe(400)
      expect(response.body.success).toBe(false)
    })
  })
})
