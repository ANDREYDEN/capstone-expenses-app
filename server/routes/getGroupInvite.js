const {
  generateInviteToken,
  stringFromId
} = require("../src/utils.js")

exports.getGroupInvite = {
  type: "get",
  path: "/groups/:id/invite",
  authNeeded: true,
  callback: async function getGroupInvite(req, res) {
    try {
      const email = req.email
      const user = await global.db.collection("users").findOne({ email })

      const groupId = req?.params?.id
      if (!(user && user.groupIds.map(stringFromId).includes(groupId)) || !groupId) {
        res.status(403)
        res.send({ message: "Forbidden" })
        res.end()
        return
      }

      const token = generateInviteToken(groupId)

      res.status(200)
      res.send({ message: "OK", token })
      res.end()
      return
    }
    catch (err) {
      console.error(err)
      res.status(500)
      res.send({ error: "Internal server error" })
      res.end()
    }
  }
}
