const bcrypt = require("bcrypt")
const { MongoClient, ObjectId } = require("mongodb")
const jwt = require("jsonwebtoken")
const {OAuth2Client} = require("google-auth-library");
const client = new OAuth2Client("156305616884-kpnf7tl95noliu8243c4310fbp9h1v79.apps.googleusercontent.com")

const SALT_ROUNDS = 10

async function verifyGoogleToken(token) {
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: "156305616884-kpnf7tl95noliu8243c4310fbp9h1v79.apps.googleusercontent.com",  // Specify the CLIENT_ID of the app that accesses the backend
  });
  return ticket.getPayload()
}

// makes bcrypt encrypted hash from a password
function makeHashOf(password, saltRounds) {
  return new Promise((resolve, reject) => {
    bcrypt.hash(password, saltRounds, (err, hash) => {
      if (err) {
        reject(err)
        return
      }
      resolve(hash)
    })
  })
}

// checks password/hash match to verify password
function passwordsMatch(password, hash) {
  return new Promise((resolve, reject) => {
    bcrypt.compare(password, hash, (err, res) => {
      if (err) {
        reject(err)
        return
      }
      resolve(res)
    })
  })
}

// gets all request data and parses as json
function retrieveDataFrom(req) {
  return new Promise((resolve, reject) => {
    let data = ""
    req.on("data", chunk => {
      data += chunk
    })
    req.on("end", () => {
      let parsed
      try {
        parsed = JSON.parse(data)
      }
      catch (err) {
        reject(new Error("Failed to parse json"))
      }
      resolve(parsed)
    })
    req.on("error", (err) => {
      reject(err)
    })
  })
}

// checks for validity of the token
function authenticateToken(req, res, next) {
  if (req.cookies["jwt"]) {
    doJWTAuthentification(req, res, next)
  }
  else {
    doGoogleAuthentification(req, res, next)
  }
}

// validates token that was obtained from google
function doGoogleAuthentification(req, res, next) {
  const token = req.cookies["tokenId"]
  if (!token) {
    res.status(401)
    res.send("Failed to authentificate. Please log in")
    res.end()
    return
  }
  verifyGoogleToken(token).then(async decoded => {
    req.username = decoded.name
    req.email = decoded.email
    next()
  }).catch(err => {
    res.status(403)
    res.send("Failed to authentificate. Please log in")
    res.end()
    return
  })
}
// validates jwt token
function doJWTAuthentification(req, res, next) {
  const token = req.cookies["jwt"]
  if (!token) {
    res.status(401)
    res.send("Failed to authentificate. Please log in")
    res.end()
    return
  }
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      res.status(403)
      res.send("Failed to authentificate. Please log in")
      res.end()
      return
    }
    req.username = decoded.username
    req.email = decoded.email
    res.decodedTokenData = decoded
    next()
  })
}

function generateAccessTokenFor({ email, username }) {
  return jwt.sign({ email, username }, process.env.JWT_SECRET, { expiresIn: 60 * 60 })
}

function generateInviteToken(groupId, expiresIn = (60*60*48)) {
  return jwt.sign({ groupId }, process.env.JWT_SECRET, { expiresIn })
}
function validateInviteToken(token) {
  return new Promise((resolve, reject) => {
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        reject(err)
        return
      }
      resolve(decoded)
    })
  })
}

// adds listener to any exit events to execute some cleanup function if we need any
function exitHandler(cleanUpFn) {
  process.stdin.resume() // so the program will not close instantly
  const exit = () => {
    cleanUpFn()
    process.exit()
  }
  process.on("exit", exit)
  //catches ctrl+c event
  process.on("SIGINT", exit)
  // catches "kill pid" (for example: nodemon restart)
  process.on("SIGUSR1", exit)
  process.on("SIGUSR2", exit)
  //catches uncaught exceptions
  process.on("uncaughtException", exit)
}

// sets up db connction; adds db connection close to exitHandler
function dbConnect(url) {
  return new Promise((resolve, reject) => {
    const cl = new MongoClient(url, { useUnifiedTopology: true })
    cl.connect((err, client) => {
      if (err) {
        reject(err)
        return
      }
      exitHandler(() => {
        console.log(" - Closing Database Conneciton")
        client.close()
      })
      const db = client.db("expencify")
      console.log(" - Connected to Database")
      resolve(db)
    })
  })
}

// adds routes to the express app
function addRoutes(routes, app) {
  routes.forEach(route => {
    const name = Object.keys(route)[0]
    const { type, path, authNeeded, callback } = route[name]
    console.log(` + Adding ${name} route at ${path}`)
    if (authNeeded) {
      app[type](path, authenticateToken, callback)
    }
    else {
      app[type](path, callback)
    }
  })
}

// converting string to mongo ObjectId to be used in the databse
function idFromString(string) {
  return new ObjectId(string)
}

// converting mongo ObjectId into string
function stringFromId(id) {
  return id.toHexString()
}

function randomColor() {
  const colors = [ "#900", "#090", "#009" ]
  const index = Math.floor(Math.random() * colors.length)
  return colors[index]
}

exports.SALT_ROUNDS = SALT_ROUNDS
exports.makeHashOf = makeHashOf
exports.retrieveDataFrom = retrieveDataFrom
exports.authenticateToken = authenticateToken
exports.generateAccessTokenFor = generateAccessTokenFor
exports.exitHandler = exitHandler
exports.dbConnect = dbConnect
exports.addRoutes = addRoutes
exports.passwordsMatch = passwordsMatch
exports.idFromString = idFromString
exports.stringFromId = stringFromId
exports.verifyGoogleToken = verifyGoogleToken
exports.randomColor = randomColor
exports.generateInviteToken = generateInviteToken
exports.validateInviteToken = validateInviteToken
