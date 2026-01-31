import feedbackService from "../services/feedbackService.js"
import { SuccessResponse } from "../utils/response.js"
import validation from "../validations/validation.js"
import feedbackValidation from "../validations/feefbackValidation.js"

const create = async (req, res, next) => {
  try {
    const user = req.user
    const request = req.body

    const validatedRequest = validation(feedbackValidation.create, request)
    const feedback = await feedbackService.create(validatedRequest, user)
    return res
      .status(201)
      .json(new SuccessResponse("Feedback created successfully", { feedback }))
  } catch (error) {
    next(error)
  }
}

const feedbackController = {
  create,
}
export default feedbackController
