
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
    }
    catch (err) {
      console.error(err)
      res.status(500)
      res.send({ error: "Internal server error" })
      res.end()
    }
  }
}