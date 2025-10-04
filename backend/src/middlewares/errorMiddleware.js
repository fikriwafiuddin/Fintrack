import logger from "../utils/logger.js"
import { ErrorResponse } from "../utils/response.js"

const errorMiddleware = (err, req, res, next) => {
  if (err instanceof ErrorResponse) {
    return res.status(err.status).json({
      success: err.success,
      message: err.message,
      errors: err.errors,
      data: err.data,
      meta: err.meta,
    })
  }

  logger.error(`[ERROR] ${err.message} - ${req.method} ${req.originalUrl}`)
  return res.status(500).json(new ErrorResponse("Internal Server Error"))
}

export default errorMiddleware
