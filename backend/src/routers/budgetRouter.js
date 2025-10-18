import express from "express"
import { clerkMiddleware } from "@clerk/express"
import authMiddleware from "../middlewares/authMiddleware.js"
import budgetController from "../controllers/budgetController.js"

const budgetRouter = express.Router()

budgetRouter.post(
  "/",
  clerkMiddleware(),
  authMiddleware,
  budgetController.create
)
budgetRouter.put(
  "/:id",
  clerkMiddleware(),
  authMiddleware,
  budgetController.update
)
budgetRouter.delete(
  "/:id",
  clerkMiddleware(),
  authMiddleware,
  budgetController.remove
)
budgetRouter.get(
  "/",
  clerkMiddleware(),
  authMiddleware,
  budgetController.getAll
)

export default budgetRouter
