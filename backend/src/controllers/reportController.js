import reportSevice from "../services/reportService.js"
import { SuccessResponse } from "../utils/response.js"
import reportValidation from "../validations/reportValidation.js"
import validation from "../validations/validation.js"

const getSummary = async (req, res, next) => {
  try {
    const user = req.user
    const request = req.query

    const validatedRequest = validation(reportValidation.summary, request)
    const data = await reportSevice.getSummary(validatedRequest, user)

    return res
      .status(200)
      .json(new SuccessResponse("Report summary successfully retrieved", data))
  } catch (error) {
    next(error)
  }
}

const getLast6MonthsSummary = async (req, res, next) => {
  try {
    const user = req.user

    const data = await reportSevice.getLast6MonthsSummary(user)

    return res
      .status(200)
      .json(
        new SuccessResponse(
          "Data last 6 months summary successfully retrieved",
          data,
        ),
      )
  } catch (error) {
    next(error)
  }
}

const reportController = {
  getSummary,
  getLast6MonthsSummary,
}
export default reportController
