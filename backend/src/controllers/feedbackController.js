import feedbackService from "../services/feedbackService.js"
import { SuccessResponse } from "../utils/response.js"

const create = async (req, res, next) => {
  try {
    const user = req.user
    const request = req.body

    const feedback = await feedbackService.create(request, user)
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
