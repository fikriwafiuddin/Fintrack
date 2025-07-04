import ResponseError from "../error/error-response.js"

const errorMiddleware = (err, req, res, next) => {
  if (err instanceof ResponseError) {
    return res.status(err.status).json({
      message: err.message,
      errors: err.data,
    })
  }

  console.error(err) // Log the error for debugging

  return res.status(500).json({
    message: "Internal Server Error",
    errors: {},
  })
}

export default errorMiddleware
