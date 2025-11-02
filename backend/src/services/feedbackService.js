import Feedback from "../models/feedbackModel.js"
import feedbackValidation from "../validations/feefbackValidation.js"
import validation from "../validations/validation.js"

const create = async (request, user) => {
  const { subject, message } = validation(feedbackValidation.create, request)

  const feedback = await Feedback.create({
    user,
    subject,
    message,
  })

  return feedback
}

const feedbackService = {
  create,
}
export default feedbackService
