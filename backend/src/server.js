import "dotenv/config"
import logger from "./utils/logger.js"
import connectDB from "./utils/connectDB.js"
import app from "./app.js"

const PORT = process.env.PORT || 5000

connectDB()

app.listen(PORT, () => {
  logger.info(`Server is running on http://localhost:${PORT}`)
})
