import settingService from "../services/settingService.js"
import { SuccessResponse } from "../utils/response.js"

const show = async (req, res, next) => {
  try {
    const user = req.user

    const userPreference = await settingService.show(user)

    return res.status(200).json(
      new SuccessResponse("User preference successfully retrieved", {
        userPreference,
      })
    )
  } catch (error) {
    next(error)
  }
}

const update = async (req, res, next) => {
  try {
    const user = req.user
    const request = req.body

    const userPreference = await settingService.update(request, user)

    return res.status(200).json(
      new SuccessResponse("User preference successfully updated", {
        userPreference,
      })
    )
  } catch (error) {
    next(error)
  }
}

const settingController = {
  show,
  update,
}
export default settingController
