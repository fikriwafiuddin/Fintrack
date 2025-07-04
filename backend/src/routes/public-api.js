import express from "express"
import userController from "../controllers/user-controller.js"
import ResponseError from "../error/error-response.js"
import errorMiddleware from "../middlewares/error-middleware.js"

const publicRouter = express.Router()

publicRouter.post("/auth/register", userController.register)
publicRouter.post("/auth/login", userController.login)

publicRouter.all(/.*/, (req, res) => {
  throw new ResponseError("Not Found", 404)
})

publicRouter.use(errorMiddleware)

export default publicRouter
