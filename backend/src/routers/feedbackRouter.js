import express from "express"
import { clerkMiddleware } from "@clerk/express"
import authMiddleware from "../middlewares/authMiddleware.js"
import feedbackController from "../controllers/feedbackController.js"

const feedbackRouter = express.Router()

feedbackRouter.post(
  "/",
  clerkMiddleware(),
  authMiddleware,
  feedbackController.create
)

export default feedbackRouter
