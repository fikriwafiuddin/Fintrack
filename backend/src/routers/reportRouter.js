import express from "express"
import authMiddleware from "../middlewares/authMiddleware.js"
import { clerkMiddleware } from "@clerk/express"
import reportController from "../controllers/reportController.js"

const reportRouter = express.Router()

reportRouter.get(
  "/summary",
  clerkMiddleware(),
  authMiddleware,
  reportController.getSummary
)
reportRouter.get(
  "/tren-6-monsths",
  clerkMiddleware(),
  authMiddleware,
  reportController.getLast6MonthsSummary
)

export default reportRouter
