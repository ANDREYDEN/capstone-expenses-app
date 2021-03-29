const {
  retrieveDataFrom,
  idFromString
} = require("../src/utils.js")

exports.addGroup = {
  type: "post",
  path: "/groups/new/",
  authNeeded: true,
  callback: async function addGroup(req, res) {
    try {
      const email = req.email
      const { name } = await retrieveDataFrom(req)
      // TODO: security
      const user = await global.db.collection("users").findOne({ email: req.email })
      if (! user) {
        res.status(403)
        res.send("Forbidden")
        res.end()
        return
      }
      // TODO: restriction for N group; This is a topic for discussion
      const groupDoc = {
        name,
        createdBy: user._id,
        userEmails: [user.email], // this used only for invitation purpuse
        userIds: [user._id]
      }
      const inserted = await global.db.collection("groups").insertOne(groupDoc)
      const newGroupId = inserted.ops[0]._id
      await global.db.collection("users").update({ _id: user._id }, { $push: { groupIds: newGroupId } })

      res.status(200)
      res.send({ message: "Added a new group successfully", group: inserted.ops[0] })
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