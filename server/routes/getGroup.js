const {
  idFromString
} = require("../src/utils.js")

exports.getGroup = {
  type: "get",
  path: "/groups/:id",
  authNeeded: true,
  callback: async function getGroup(req, res) {
    try {
      const email = req.email
      // TODO: some security and restrictions so people cannot fetch something they do not have access to
      const user = await global.db.collection("users").findOne({ email })
      if (!user || !req.params?.id) {
        res.status(403)
        res.send({ message: "Forbidden" })
        res.end()
      }
      const group = await global.db.collection("groups").findOne({ _id: idFromString(req.params.id) });
      res.status(200)
      res.send({ message: "OK", group })
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
