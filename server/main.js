'use strict'

require('dotenv').config() // sets up env params

const express = require('express')
const fs = require("fs")
const cookieParser = require('cookie-parser');
const path = require("path")

const utils = require('./src/utils.js')

const DB_URL = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/expensify"
const ROUTES_FOLDER = "./routes/"

async function main() {
  // TODO: private key read base on process.env variable

  // sets up database connection
  const db = await utils.dbConnect(DB_URL)
  global.db = db
  // creates express app
  const cors = require('cors')
  const app = express()
  app.use(express.static(path.join(__dirname, "../client/build")))
  app.use(cors({ origin: true, credentials: true }))
  app.use(cookieParser())

  app.listen(process.env.PORT, () => {
    console.log(`listening on ${process.env.PORT}`)
  })
  // scans ROUTES_FOLDER and adds route for every one specificed
  const routes = fs.readdirSync(ROUTES_FOLDER).map(fileName => require(`${ROUTES_FOLDER}${fileName}`))

  utils.addRoutes(routes, app)
  // NOTE: investigate was useful in the past. In ideal world should do the same as line:24 app.use(express.static(...
  // app.use("*", express.static(path.join(__dirname, "../client/build")))
}

main().catch(console.error)

