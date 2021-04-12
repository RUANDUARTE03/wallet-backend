const express = require('express')
const routes = express.Router()

const userController = require("../controllers/user.controller")

routes.post("/user", userController.create)

module.exports = routes