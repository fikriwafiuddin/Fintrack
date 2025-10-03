import ResponseError from "../error/error-response.js"
import cloudinary from "../utils/clodinary.js"
import logger from "../utils/logger.js"

const errorMiddleware = (err, req, res, next) => {
  if (err instanceof ResponseError) {
    return res.status(err.status).json({
      message: err.message,
      errors: err.data,
    })
  }

  const image = req.file
  if (image) {
    cloudinary.uploader.destroy(image.public_id, (error) => {
      if (error) {
        logger.error(`Failed to delete image from Cloudinary: ${error.message}`)
      }
    })
  }

  logger.error(`[ERROR] ${err.message} - ${req.method} ${req.originalUrl}`)
  return res.status(500).json({
    message: "Internal Server Error",
    errors: {},
  })
}

export default errorMiddleware
