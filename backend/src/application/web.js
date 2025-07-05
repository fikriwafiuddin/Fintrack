import express from "express"
import cors from "cors"
import "dotenv/config"
import connectDB from "../utils/connectDB.js"
import publicRouter from "../routes/public-api.js"
import apiRouter from "../routes/api.js"

const web = express()

web.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
)
web.use(express.json())

connectDB()

web.use(apiRouter)
web.use(publicRouter)

export default web
