import { describe, expect, it } from "vitest"
import request from "supertest"
import app from "../../src/app.js"
import Feedback from "../../src/models/feedbackModel.js"

describe("Feedback Routes Integration", () => {
  let userId = "test-user-id"

  describe("POST /feedback", () => {
    it("should create feedback successfully", async () => {
      const payload = {
        subject: "Integration Test",
        message: "This is a test message from integration test",
      }

      const response = await request(app).post("/feedback").send(payload)

      expect(response.status).toBe(201)
      expect(response.body.success).toBe(true)
      expect(response.body.data.feedback.subject).toBe(payload.subject)

      const inDb = await Feedback.findOne({
        user: userId,
        subject: payload.subject,
      })
      expect(inDb).not.toBeNull()
    })

    it("should return 400 if subject is missing", async () => {
      const payload = {
        message: "No subject here",
      }

      const response = await request(app).post("/feedback").send(payload)

      expect(response.status).toBe(400)
    })
  })
})
