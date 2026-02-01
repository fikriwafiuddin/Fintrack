import { describe, expect, it, vi, beforeEach } from "vitest"
import chatService from "../../../src/services/chatService.js"
import Chat from "../../../src/models/chatModel.js"
import { ai } from "../../../src/utils/ai.js"

// Mock AI utility
vi.mock("../../../src/utils/ai.js", () => ({
  ai: {
    models: {
      generateContent: vi.fn(),
    },
  },
  MODEL_NAME: "test-model",
  systemInstruction: "test-instruction",
}))

describe("chatService", () => {
  let userId = "test-user-id"

  describe("show", () => {
    it("should return existing chat or create new one", async () => {
      const result = await chatService.show(userId)
      expect(result.user).toBe(userId)
      expect(result.messages).toEqual([])

      const inDb = await Chat.findOne({ user: userId })
      expect(inDb).not.toBeNull()
    })
  })

  describe("askAI", () => {
    it("should add user message, call AI, and save model response", async () => {
      const mockAiResponse = { text: "Hello, I am Finny!" }
      ai.models.generateContent.mockResolvedValue(mockAiResponse)

      const result = await chatService.askAI({ message: "Hi Finny" }, userId)

      expect(result.message.role).toBe("model")
      expect(result.message.content).toBe("Hello, I am Finny!")

      const chat = await Chat.findOne({ user: userId })
      expect(chat.messages.length).toBe(2)
      expect(chat.messages[0].role).toBe("user")
      expect(chat.messages[1].role).toBe("model")
    })
  })
})
