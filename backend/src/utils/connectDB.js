import mongoose from "mongoose"
import logger from "./logger.js"

mongoose.set("debug", (collection, method, query, doc) => {
  const safeStringify = (obj) => {
    const cache = new Set()
    return JSON.stringify(obj, (key, value) => {
      if (typeof value === "object" && value !== null) {
        if (cache.has(value)) {
          return "[Circular]"
        }
        cache.add(value)
      }
      return value
    })
  }

  logger.info(
    `[MONGO] ${collection}.${method} ${JSON.stringify(query)} ${safeStringify(
      doc
    )}`
  )
})

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI)
    logger.info("MongoDB connected successfully")
  } catch (error) {
    logger.error("MongoDB connection failed:", error)
    process.exit(1)
  }
}

export default connectDB
