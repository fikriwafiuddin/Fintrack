import User from "../models/userModel.js"
import settingValidation from "../validations/settingValidation.js"
import validation from "../validations/validation.js"

const show = async (user) => {
  let userPreference = await User.findOne({ userId: user }).select("currency")
  if (!userPreference) {
    userPreference = await User.create({ userId: user })
  }

  return { currency: userPreference.currency }
}

const update = async (request, user) => {
  const { currency } = validation(settingValidation.update, request)

  let userPreference = await User.findOne({ userId: user })
  if (!userPreference) {
    userPreference = new User({ userId: user })
  }

  userPreference.currency = currency

  await userPreference.save()

  return { currency: userPreference.currency }
}

const settingService = {
  show,
  update,
}
export default settingService
