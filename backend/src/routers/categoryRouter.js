import express from "express"
import authMiddleware from "../middlewares/authMiddleware.js"
import categoryController from "../controllers/categoryController.js"
import { clerkMiddleware } from "@clerk/express"

const categoryRouter = express.Router()

categoryRouter.get(
  "/",
  clerkMiddleware(),
  authMiddleware,
  categoryController.getAll
)
categoryRouter.post(
  "/",
  clerkMiddleware(),
  authMiddleware,
  categoryController.create
)
categoryRouter.put(
  "/:id",
  clerkMiddleware(),
  authMiddleware,
  categoryController.update
)
categoryRouter.delete(
  "/:id",
  clerkMiddleware(),
  authMiddleware,
  categoryController.remove
)

export default categoryRouter
