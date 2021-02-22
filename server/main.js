'use strict'

require('dotenv').config() // sets up env params

const express = require('express')
const fs = require("fs")

const utils = require('./src/utils.js')

const DB_URL = "mongodb://127.0.0.1:27017/expencify"
const ROUTES_FOLDER = "./routes/"

async function main() {
  // TODO: private key read base on process.env variable

  // sets up database connection
  const db = await utils.dbConnect(DB_URL)
  global.db = db
  // creates express app
  const cors = require('cors')
  const app = express()
  app.use(cors())
  app.listen(process.env.PORT, () => {
    console.log(`listening on ${process.env.PORT}`)
  })
  // scans ROUTES_FOLDER and adds route for every one specificed
  const routes = fs.readdirSync(ROUTES_FOLDER).map(fileName => require(`${ROUTES_FOLDER}${fileName}`))
  utils.addRoutes(routes, app)
}

main().catch(console.error)

