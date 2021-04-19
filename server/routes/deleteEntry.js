const {
  retrieveDataFrom,
  idFromString
} = require("../src/utils.js")

exports.deleteEntry = {
  type: "delete",
  path: "/sheets/deleteEntry/:id/:index",
  authNeeded: true,
  callback: async function deleteEntry(req, res) {
    try {
      if (!req?.params?.id || !("index" in req.params)) {
        res.status(400)
        res.send({ error: "Bad request" })
        res.end()
        return
      }
      const doc = await global.db.collection("sheets").findOne({ _id: idFromString(req.params.id) })
      if (!doc) {
        res.status(404)
        res.send("Sheet is not found")
        res.end()
        return
      }
      const entry = doc.entries[req.params.index]
      if (!entry) {
        res.status(200)
        res.send({ message: "Deleted Entry Successfully!" })
        res.end()
        return
      }
      await global.db.collection("sheets").updateOne({ _id: doc._id }, { $pull: { entries: entry } })
      res.status(200)
      res.send({ message: "Deleted Entry Successfully!" })
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