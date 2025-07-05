import bcrypt from "bcrypt"

import ResponseError from "../error/error-response.js"
import User from "../models/user-model.js"
import generateToken from "../utils/generateToken.js"
import userValidation from "../validations/user-validation.js"
import validation from "../validations/validation.js"

const register = async (request) => {
  const data = validation(userValidation.registerValidation, request)
  const { username, email, password } = data

  const existingUser = await User.findOne({ email })
  if (existingUser) {
    throw new ResponseError("User already exists", 400, {
      email: "Email is already registered",
    })
  }

  const hashedPassword = await bcrypt.hash(password, 10)

  const user = await User.create({ username, email, password: hashedPassword })

  const token = generateToken(user._id)
  return {
    token,
    user: {
      id: user._id,
      username: user.username,
      email: user.email,
    },
  }
}

const login = async (request) => {
  const data = validation(userValidation.loginValidation, request)
  const { email, password } = data

  const user = await User.findOne({ email })

  if (!user) {
    throw new ResponseError("Email or password wrong", 401)
  }

  const comparePassword = await bcrypt.compare(password, user.password)
  if (!comparePassword) {
    throw new ResponseError("Email or password wrong", 401)
  }

  const token = generateToken(user._id)
  return {
    token,
    user: {
      id: user._id,
      username: user.username,
      email: user.email,
    },
  }
}

const get = async (id) => {
  const user = await User.findById(id)
  if (!user) {
    throw new ResponseError("User not found", 404)
  }
  return user
}

export default {
  register,
  login,
  get,
}
