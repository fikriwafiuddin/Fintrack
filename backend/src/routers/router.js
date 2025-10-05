import express from "express"
import categoryRouter from "./categoryRouter.js"
import errorMiddleware from "../middlewares/errorMiddleware.js"
import { ErrorResponse } from "../utils/response.js"
import transactionRouter from "./transactionRouter.js"

const router = express.Router()

router.use("/categories", categoryRouter)
router.use("/transactions", transactionRouter)

router.all(/.*/, (req, res) =>
  res.status(404).json(new ErrorResponse("Route not found", 404))
)

router.use(errorMiddleware)

export default router
