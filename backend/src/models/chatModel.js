import mongoose from "mongoose"

const chatSchema = new mongoose.Schema(
  {
    user: {
      type: String,
      required: true,
    },
    messages: [
      {
        role: { type: String, required: true, enum: ["user", "model"] },
        content: { type: String, required: true },
        timestamp: { type: Date, default: new Date() },
      },
    ],
  },
  {
    timestamps: true,
  }
)

const Chat = mongoose.model("Chat", chatSchema)
export default Chat
