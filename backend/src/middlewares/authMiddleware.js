const authMiddleware = (req, res, next) => {
  const { userId } = req.auth()
  if (!userId) {
    return res.status(401).json({
      message: "Unauthorized access",
      errors: {},
    })
  }

  req.user = userId
  next()
}

export default authMiddleware
