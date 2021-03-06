
const { UserRefreshClient } = require("google-auth-library")
const {
  retrieveDataFrom,
  passwordsMatch,
  SALT_ROUNDS,
  generateAccessTokenFor
} = require("../src/utils.js")

exports.logIn = {
  type: "post",
  path: "/login",
  authNeeded: false,
  callback: async function logIn(req, res) {
    try {
      const { email, password } = await retrieveDataFrom(req)

      const user = await global.db.collection("users").findOne({ email })
      if (!user) {
        res.status(404)
        res.send({ error: `User ${email} is not found` })
        res.end()
        return
      }

      const passwordMatch = await passwordsMatch(password, user.password.hash)
      if (!passwordMatch) {
        res.status(403)
        res.send({ error: `Password mismatch` })
        res.end()
        return
      }

      const token = generateAccessTokenFor({ email, name: user.name })
      if (token) {
        const userObj = { _id: user._id, name: user.name, email, color: user.color }
        res.status(200)
        res.cookie('jwt', token, { expires: new Date(Date.now() + 60 * 60 * 1000) })
        res.send({ OK: "Authorized Successfully", jwt: token, user: userObj })
        res.end()
      }
    }
    catch (err) {
      console.error(err)
      res.status(500)
      res.send({ error: "Internal server error" })
      res.end()
    }
  }
}