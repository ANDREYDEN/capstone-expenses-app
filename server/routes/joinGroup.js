
const {
  validateInviteToken,
  idFromString,
  stringFromId
} = require("../src/utils.js")

exports.joinGroup = {
  type: "post",
  path: "/groups/:token/join",
  authNeeded: true,
  callback: async function joinGroup(req, res) {
    try {
      const email = req.email
      const token = req?.params?.token
      if (! token) {
        res.status(403)
        res.send("Forbidden")
        res.end()
        return
      }
      const { groupId } = await validateInviteToken(token)

      const group = await global.db.collection("groups").findOne({ _id: idFromString(groupId) })
      if (! group) {
        res.status(404)
        res.send("Group is not found")
        res.end()
        return
      }
      const user = await global.db.collection("users").findOne({ email })
      if (! user) {
        res.status(403)
        res.send("Forbidden")
        res.end()
        return
      }

      // Add user to a group
      if (! group.userIds.map(stringFromId).includes(stringFromId(user._id))) {
        await global.db.collection("groups").updateOne({ _id: group._id }, { $push: { userIds: user._id } })
        await global.db.collection("users").updateOne({ _id: user._id }, { $push: { groupIds: group._id } })
        user.groupIds.push(group._id)
      }
      res.status(200)
      res.send({ message: "OK", user })
      res.end()
    }
    catch (err) {
      console.error(err)
      res.status(500)
      res.send({ error: "Internal server error" })
      res.end()
    }
  }
}
