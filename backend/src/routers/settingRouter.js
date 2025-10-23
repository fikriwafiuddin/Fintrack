import express from "express"
import { clerkMiddleware } from "@clerk/express"
import authMiddleware from "../middlewares/authMiddleware.js"
import settingController from "../controllers/settingController.js"

const settingRouter = express.Router()

settingRouter.get(
  "/",
  clerkMiddleware(),
  authMiddleware,
  settingController.show
)
settingRouter.put(
  "/",
  clerkMiddleware(),
  authMiddleware,
  settingController.update
)

export default settingRouter
