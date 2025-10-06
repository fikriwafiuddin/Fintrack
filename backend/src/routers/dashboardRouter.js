import express from "express"
import authMiddleware from "../middlewares/authMiddleware.js"
import { clerkMiddleware } from "@clerk/express"
import dashboardController from "../controllers/dashboardControlller.js"

const dashboardRouter = express.Router()

dashboardRouter.get(
  "/balance",
  clerkMiddleware(),
  authMiddleware,
  dashboardController.getBalance
)
dashboardRouter.get(
  "/summary",
  clerkMiddleware(),
  authMiddleware,
  dashboardController.getSummary
)
dashboardRouter.get(
  "/recent-transactions",
  clerkMiddleware(),
  authMiddleware,
  dashboardController.getRecentTransactions
)

export default dashboardRouter
