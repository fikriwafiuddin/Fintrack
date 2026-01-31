import express from "express"
import recurringController from "../controllers/recurringController.js"
import { clerkMiddleware } from "@clerk/express"
import authMiddleware from "../middlewares/authMiddleware.js"

const recurringRouter = express.Router()

recurringRouter.post(
  "/",
  clerkMiddleware(),
  authMiddleware,
  recurringController.create,
)
recurringRouter.put(
  "/:id",
  clerkMiddleware(),
  authMiddleware,
  recurringController.update,
)
recurringRouter.patch(
  "/:id/status",
  clerkMiddleware(),
  authMiddleware,
  recurringController.updateStatus,
)
recurringRouter.delete(
  "/:id",
  clerkMiddleware(),
  authMiddleware,
  recurringController.remove,
)
recurringRouter.get(
  "/",
  clerkMiddleware(),
  authMiddleware,
  recurringController.getAll,
)

export default recurringRouter
