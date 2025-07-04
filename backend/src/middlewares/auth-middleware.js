import jwt from "jsonwebtoken"

const authMiddleware = (req, res, next) => {
  const token = req.cookies?.token

  try {
    if (!token) {
      return res.status(401).json({
        message: "Unauthorized",
        errors: {},
      })
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.userId = decoded.id
    next()
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({
        message: "Unauthorized - Invalid Token",
        errors: {},
      })
    }

    return res.status(500).json({
      message: "Internal Server Error",
      errors: {},
    })
  }
}

export default authMiddleware
