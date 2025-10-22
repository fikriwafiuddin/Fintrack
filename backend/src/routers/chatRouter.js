import express from "express"
import { clerkMiddleware } from "@clerk/express"
import authMiddleware from "../middlewares/authMiddleware.js"
import chatController from "../controllers/chatController.js"

const chatRouter = express.Router()

chatRouter.get("/", clerkMiddleware(), authMiddleware, chatController.show)
chatRouter.post(
  "/ask-ai",
  clerkMiddleware(),
  authMiddleware,
  chatController.askAI
)

export default chatRouter
