import express from "express"
import cors from "cors"
import "dotenv/config"
import logger from "./utils/logger.js"
import httpLogger from "./middlewares/httpLogger.js"
import connectDB from "./utils/connectDB.js"
import router from "./routers/router.js"

const app = express()
const PORT = process.env.PORT || 5000

app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "http://localhost:5173",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
  })
)
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(httpLogger)

connectDB()

app.use(router)

app.listen(PORT, () => {
  logger.info(`Server is running on http://localhost:${PORT}`)
})
