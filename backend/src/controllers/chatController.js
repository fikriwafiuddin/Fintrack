import chatService from "../services/chatService.js"
import { SuccessResponse } from "../utils/response.js"

const show = async (req, res, next) => {
  try {
    const user = req.user

    const chat = await chatService.show(user)

    return res
      .status(200)
      .json(new SuccessResponse("Chat successfully retrieved", { chat }))
  } catch (error) {
    next(error)
  }
}

const askAI = async (req, res, next) => {
  try {
    const request = req.body
    const user = req.user

    const data = await chatService.askAI(request, user)

    return res
      .status(200)
      .json(new SuccessResponse("AI successfully responded", { ...data }))
  } catch (error) {
    next(error)
  }
}

const chatController = {
  show,
  askAI,
}
export default chatController
