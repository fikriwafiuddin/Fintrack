import express from "express"
import categoryController from "../controllers/category-controller.js"
import authMiddleware from "../middlewares/auth-middleware.js"
import errorMiddleware from "../middlewares/error-middleware.js"
import userController from "../controllers/user-controller.js"

const apiRouter = express.Router()

apiRouter.get("/auth/getUser", authMiddleware, userController.getUser)

apiRouter.get("/categories/:type", authMiddleware, categoryController.all)

apiRouter.use(errorMiddleware)

export default apiRouter
