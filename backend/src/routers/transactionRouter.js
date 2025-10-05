import express from "express"
import transactionController from "../controllers/transactionController.js"
import { clerkMiddleware } from "@clerk/express"
import authMiddleware from "../middlewares/authMiddleware.js"

const transactionRouter = express.Router()

transactionRouter.post(
  "/",
  clerkMiddleware(),
  authMiddleware,
  transactionController.create
)
transactionRouter.put(
  "/:id",
  clerkMiddleware(),
  authMiddleware,
  transactionController.update
)
transactionRouter.delete(
  "/:id",
  clerkMiddleware(),
  authMiddleware,
  transactionController.remove
)
transactionRouter.get(
  "/",
  clerkMiddleware(),
  authMiddleware,
  transactionController.getAll
)

export default transactionRouter
