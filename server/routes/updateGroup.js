
const {
  retrieveDataFrom,
  idFromString,
  stringFromId
} = require("../src/utils.js")

exports.updateGroup = {
  type: "post",
  path: "/groups/update/:id",
  authNeeded: true,
  callback: async function updateGroup(req, res) {
    try {
      // TODO: name validation
      const { name } = await retrieveDataFrom(req)
      const email = req.email
      const groupId = req.params.id

      if (!groupId) {
        res.status(400)
        res.send("Bad request")
        res.end()
        return
      }
     
      const group = await global.db.collection("groups").findOne({ _id: idFromString(groupId) })
      if (! group) {
        res.status(404)
        res.send("Group is not found")
        res.end()
        return
      }
      const user = await global.db.collection("users").findOne({ email })
      // if (! user && stringFromId(group.createdBy) !== user._id) {
      //   res.status(403)
      //   res.send("Forbidden")
      //   res.end()
      //   return
      // }

      await global.db.collection("groups").updateOne({ _id: group._id }, { $set: { name } })
      group.name = name
      res.status(200)
      res.send({ message: "OK", group })
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
