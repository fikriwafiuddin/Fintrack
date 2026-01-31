import Chat from "../models/chatModel.js"
import { ai, MODEL_NAME, systemInstruction } from "../utils/ai.js"

// const getAll = async (user) => {
//     const chats =
// }

// This function is used to get chat details based user ID.
const show = async (user) => {
  //   validation(chatValidation, id)

  let chat = await Chat.findOne({ user })
  if (!chat) {
    chat = await Chat.create({ user })
  }

  return chat
}

const askAI = async (data, user) => {
  const { message } = data

  let chat = await Chat.findOne({ user })
  if (!chat) {
    chat = new Chat({ user })
  }

  // 2. Push message from user
  chat.messages.push({ role: "user", content: message })

  // 3. Bentuk payload untuk Gemini API
  const contents = chat.messages.map((msg) => ({
    role: msg.role === "user" ? "user" : "model",
    parts: [{ text: msg.content }],
  }))

  // 4. Call Gemini API
  const result = await ai.models.generateContent({
    model: MODEL_NAME,
    contents: contents,
    config: {
      systemInstruction: systemInstruction,
    },
  })

  // 5. Push message from AI
  chat.messages.push({ role: "model", content: result.text })

  // 6. Save chat
  await chat.save()

  return { message: chat.messages[chat.messages.length - 1] }
}

const chatService = {
  show,
  askAI,
}
export default chatService
