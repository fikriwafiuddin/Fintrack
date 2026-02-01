import { describe, expect, it } from "vitest"
import feedbackService from "../../../src/services/feedbackService.js"
import Feedback from "../../../src/models/feedbackModel.js"

describe("feedbackService", () => {
  let userId = "test-user-id"

  describe("create", () => {
    it("should create feedback successfully", async () => {
      const data = {
        subject: "Test Subject",
        message: "Test Message",
      }

      const result = await feedbackService.create(data, userId)

      expect(result).toBeDefined()
      expect(result.subject).toBe(data.subject)
      expect(result.message).toBe(data.message)
      expect(result.user).toBe(userId)

      const inDb = await Feedback.findOne({
        user: userId,
        subject: data.subject,
      })
      expect(inDb).not.toBeNull()
    })
  })
})
