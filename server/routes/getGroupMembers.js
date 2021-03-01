const {
  retrieveDataFrom,
  idFromString
} = require("../src/utils.js")

exports.getGroupMembers = {
  type: "get",
  path: "/groups/:id",
  authNeeded: true,
  callback: async function getGroupMembers(req, res) {
    try {
      const username = req.username
      // TODO: some security and restrictions so people cannot fetch something they do not have access to
      const doc = await global.db.collection("groups").findOne({ _id: idFromString(req.params.id) })
      if (doc) {
        const users = await global.db.collection("users").find({
          _id: { $in: doc.userIds.map(idFromString) }
        }, {
          fields: { name: 1 }
        }).toArray()
        res.status(200)
        res.send({ message: "OK", members: users })
        res.end()
        return
      }
      res.status(404)
      res.send({ message: "Not Found" })
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