import { describe, expect, it, vi } from "vitest"
import request from "supertest"
import app from "../../src/app.js"
import Chat from "../../src/models/chatModel.js"

// Mock ai utility at the integration level
vi.mock("../../src/utils/ai.js", () => ({
  ai: {
    models: {
      generateContent: vi.fn(() => Promise.resolve({ text: "AI Response" })),
    },
  },
  MODEL_NAME: "test-model",
  systemInstruction: "test-instruction",
}))

describe("Chat Routes Integration", () => {
  let userId = "test-user-id"

  describe("GET /chats", () => {
    it("should return chat history", async () => {
      await Chat.create({
        user: userId,
        messages: [{ role: "user", content: "hello" }],
      })

      const response = await request(app).get("/chats")

      expect(response.status).toBe(200)
      expect(response.body.data.chat.messages.length).toBe(1)
    })
  })

  describe("POST /chats/ask-ai", () => {
    it("should return AI response and save it", async () => {
      const payload = { message: "Tell me about my budget" }
      const response = await request(app).post("/chats/ask-ai").send(payload)

      expect(response.status).toBe(200)
      expect(response.body.data.message.role).toBe("model")
      expect(response.body.data.message.content).toBe("AI Response")

      const chat = await Chat.findOne({ user: userId })
      expect(chat.messages.length).toBe(2)
    })
  })
})
