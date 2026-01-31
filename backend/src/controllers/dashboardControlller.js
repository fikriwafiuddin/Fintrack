import dashboardService from "../services/dashboardService.js"
import { SuccessResponse } from "../utils/response.js"
import dashboardValidation from "../validations/dashboardValidation.js"
import validation from "../validations/validation.js"

const getBalance = async (req, res, next) => {
  try {
    const user = req.user

    const balance = await dashboardService.getBalance(user)

    return res
      .status(200)
      .json(new SuccessResponse("Balance sucsessfully retrivied", { balance }))
  } catch (error) {
    next(error)
  }
}

const getSummary = async (req, res, next) => {
  try {
    const user = req.user
    const request = req.query

    const validatedRequest = validation(dashboardValidation.summary, request)
    const summary = await dashboardService.getSummary(validatedRequest, user)

    return res
      .status(200)
      .json(new SuccessResponse("Summary successfullt retrivied", { summary }))
  } catch (error) {
    next(error)
  }
}

const getRecentTransactions = async (req, res, next) => {
  try {
    const user = req.user

    const transactions = await dashboardService.getRecentTransactions(user)

    return res.status(200).json(
      new SuccessResponse("Racent transactions successfully retrieved", {
        transactions,
      }),
    )
  } catch (error) {
    next(error)
  }
}

const dashboardController = {
  getBalance,
  getSummary,
  getRecentTransactions,
}
export default dashboardController
