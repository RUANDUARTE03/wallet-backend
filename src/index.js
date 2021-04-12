const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")
const routes = require('./routes')
const connection = require("./database/connection")
const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())
app.use(routes)

app.listen(4000, () => {
  connection.migrate.latest()
  console.log("Server initalized")
})