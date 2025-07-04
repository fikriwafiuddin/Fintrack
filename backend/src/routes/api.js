import express from "express"
import categoryController from "../controllers/category-controller.js"
import authMiddleware from "../middlewares/auth-middleware.js"
import errorMiddleware from "../middlewares/error-middleware.js"

const apiRouter = express.Router()

apiRouter.get("/categories/:type", authMiddleware, categoryController.all)

apiRouter.use(errorMiddleware)

export default apiRouter
