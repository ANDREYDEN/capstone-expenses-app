
const {
  retrieveDataFrom,
  authenticateToken,
  verifyGoogleToken
} = require("../src/utils.js")

exports.oauth = {
  type: "post",
  path: "/oauth",
  authNeeded: false,
  callback: async function oauth(req, res) {
    try {
      const { tokenId, platform } = await retrieveDataFrom(req)
      verifyGoogleToken(tokenId).then(async decoded => {
        const { email, name } = decoded
        const user = await global.db.collection("users").findOne({ email })
        let userObj
        if (user) {
          await global.db.collection("users").update({ email }, { $set: { name } })
          userObj = user
        }
        else {
          const inserted = await global.db.collection("users").insertOne({
            email,
            name,
            platform: "google"
          })
          userObj = inserted.ops[0]
        }
        res.status(200)
        res.cookie("tokenId", tokenId, { expires: new Date(Date.now() + 24 * 60 * 60 * 1000) })
        res.send({ OK: "Authorized Successfully", user: userObj })
        res.end()
      }).catch(err => {
        res.status(403)
        res.send({ error: `Access Forbidden` })
        res.end()
        return
      })

      // const user = await global.db.collection("users").findOne({ name: username })
      // if (!user) {
      //   res.status(404)
      //   res.send({ error: `User ${username} is not found` })
      //   res.end()
      //   return
      // }

      // const passwordMatch = await passwordsMatch(password, user.password.hash)
      // if (!passwordMatch) {
      //   res.status(403)
      //   res.send({ error: `Password mismatch` })
      //   res.end()
      //   return
      // }

      // const token = generateAccessTokenFor(username)
      // if (token) {
      //   const userObj = { _id: user._id, name: user.name }
      //   res.status(200)
      //   res.cookie("jwt", token, { expires: new Date(Date.now() + 60 * 60 * 1000) })
      //   res.send({ OK: "Authorized Successfully", jwt: token, user: userObj })
      //   res.end()
      // }
    }
    catch (err) {
      console.error(err)
      res.status(500)
      res.send({ error: "Internal server error" })
      res.end()
    }
  }
}