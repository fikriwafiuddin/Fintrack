import express from "express"
import cors from "cors"
import "dotenv/config"
import logger from "./utils/logger.js"
import httpLogger from "./middlewares/httpLogger.js"
import connectDB from "./utils/connectDB.js"

const app = express()
const PORT = process.env.PORT || 5000

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(httpLogger)

connectDB()

app.listen(PORT, () => {
  logger.info(`Server is running on http://localhost:${PORT}`)
})
