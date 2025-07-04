import userService from "../service/user-service.js"

const register = async (req, res, next) => {
  try {
    const result = await userService.register(req.body)

    res.cookie("token", result.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 24 * 60 * 60 * 1000 * 7,
      sameSite: "strict",
    })
    res.status(201).json({
      message: "User registered successfully",
      data: { user: result.user },
    })
  } catch (error) {
    next(error)
  }
}

const login = async (req, res, next) => {
  try {
    const result = await userService.login(req.body)

    res.cookie("token", result.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 24 * 60 * 60 * 1000 * 7,
      sameSite: "strict",
    })
    res.status(200).json({
      message: "User logged in successfully",
      data: { user: result.user },
    })
  } catch (error) {
    next(error)
  }
}

export default {
  register,
  login,
}
