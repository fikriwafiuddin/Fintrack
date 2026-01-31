import Feedback from "../models/feedbackModel.js"

const create = async (data, user) => {
  const { subject, message } = data

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
