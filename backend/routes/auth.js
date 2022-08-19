const express = require("express")
const { getUsersList, regUser, logUser } = require("../handlers/auth")

const authRouter = express.Router()


authRouter.post("/RegisterUser", regUser)
authRouter.post("/LogginUser", logUser)


module.exports = authRouter