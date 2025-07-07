import express from "express"
import categoryController from "../controllers/category-controller.js"
import authMiddleware from "../middlewares/auth-middleware.js"
import errorMiddleware from "../middlewares/error-middleware.js"
import userController from "../controllers/user-controller.js"
import transactionController from "../controllers/transaction-controller.js"
import statisticController from "../controllers/statistic-controller.js"

const apiRouter = express.Router()

apiRouter.put(
  "/auth/updateProfile",
  authMiddleware,
  userController.updateProfile
)
apiRouter.get("/auth/getUser", authMiddleware, userController.get)

apiRouter.post("/categories/create", authMiddleware, categoryController.create)
apiRouter.put(
  "/categories/update/:id",
  authMiddleware,
  categoryController.update
)
apiRouter.delete(
  "/categories/remove/:id",
  authMiddleware,
  categoryController.remove
)
apiRouter.get("/categories/:type", authMiddleware, categoryController.all)

apiRouter.post(
  "/transaction/create",
  authMiddleware,
  transactionController.create
)
apiRouter.delete(
  "/transaction/delete/:id",
  authMiddleware,
  transactionController.remove
)
apiRouter.put(
  "/transaction/update/:id",
  authMiddleware,
  transactionController.update
)
apiRouter.get("/transaction/:type", authMiddleware, transactionController.all)

apiRouter.get(
  "/statistic/perMonth",
  authMiddleware,
  statisticController.statisticPerMonth
)

apiRouter.use(errorMiddleware)

export default apiRouter
