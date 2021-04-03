const {
  retrieveDataFrom,
  idFromString,
  stringFromId
} = require("../src/utils.js")

exports.addGroup = {
  type: "post",
  path: "/groups/:id/add",
  authNeeded: true,
  callback: async function addGroup(req, res) {
    try {
      const email = req.email
      const { emails } = await retrieveDataFrom(req)
      const groupId = req?.params?.id
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
      if (! group.userIds.map(stringFromId).includes(stringFromId(user._id))) {
        res.status(403)
        res.send("Forbidden")
        res.end()
        return
      }

      await global.db.collection("groups").updateOne({ _id: group._id }, { $push: { userEmails: { $each: emails } } })
      res.status(200)
      res.send({ message: "Added a new member to a group successfully" })
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