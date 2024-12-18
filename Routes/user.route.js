const { Router } = require("express")
const controller = require("../Controllers/user.controller")
const Auth = require("../Middleware/Auth")

const userRouter = Router()

userRouter.post("/", controller.signup)
userRouter.get("/", controller.login)
userRouter.get("/products", Auth, controller.products)

module.exports = userRouter