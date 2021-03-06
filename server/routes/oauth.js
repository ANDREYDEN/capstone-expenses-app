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
        const { email, name, picture } = decoded
        const user = await global.db.collection("users").findOne({ email })
        let userObj
        if (user) {
          await global.db.collection("users").update({ email }, { $set: { name, imageUrl: picture } })
          userObj = user
          userObj.name = name
          userObj.imageUrl = picture
        }
        else {
          const inserted = await global.db.collection("users").insertOne({
            email,
            name,
            platform: "google",
            imageUrl: picture,
            groupIds: []
          })
          userObj = inserted.ops[0]
          const groupDoc = {
            name: `${userObj.name}'s Group`,
            createdBy: userObj._id,
            userIds: [userObj._id]
          }
          const groupInserted = await global.db.collection("groups").insertOne(groupDoc)
          const initialGroup = groupInserted.ops[0]
          await global.db.collection("users").updateOne({ _id: userObj._id }, { $push: { groupIds: initialGroup._id } })
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