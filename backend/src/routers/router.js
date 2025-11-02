import express from "express"
import categoryRouter from "./categoryRouter.js"
import errorMiddleware from "../middlewares/errorMiddleware.js"
import { ErrorResponse } from "../utils/response.js"
import transactionRouter from "./transactionRouter.js"
import dashboardRouter from "./dashboardRouter.js"
import reportRouter from "./reportRouter.js"
import budgetRouter from "./budgetRouter.js"
import chatRouter from "./chatRouter.js"
import settingRouter from "./settingRouter.js"
import feedbackRouter from "./feedbackRouter.js"

const router = express.Router()

router.use("/categories", categoryRouter)
router.use("/transactions", transactionRouter)
router.use("/budgets", budgetRouter)
router.use("/dashboard", dashboardRouter)
router.use("/report", reportRouter)
router.use("/chats", chatRouter)
router.use("/settings", settingRouter)
router.use("/feedback", feedbackRouter)

router.all(/.*/, (req, res) =>
  res.status(404).json(new ErrorResponse("Route not found", 404))
)

router.use(errorMiddleware)

export default router
