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
      // HACK:
      // Working with arrays, mongodb will not let you remove a single element whith non-unique values.
      // If $pull is used and there're other documents with the same values it will remove all of them instead of one.
      // See 
      //    https://jira.mongodb.org/browse/SERVER-1014
      //
      // Atomic way of doing this would be deleting the entry with JS here and do $set in for the new array
      // ```
      //    doc.entries.splice(req.params.index, 1)
      //    await global.db.collection("sheets").updateOne({ _id: doc._id }, { $set: { entries: doc.entries } })
      // ```
      // This might be more correct way of doing this (less network intensive, atomic, but more memory and more processor intensive)
      // This might be implemented in the future. It depends what server and database server we'll get and what's the usage of entries
      //
      // For now let's stick with non-atomic one for now.
      // Downside would be that there's a race condition possible that someone queries the data after it's been $unset and before $pull
      // 
      // I am not 100% sure, but another solution might be use of transactions
      await global.db.collection("sheets").updateOne({ _id: doc._id }, { $unset: { [`entries.${req.params.index}`]: true } }),
      await global.db.collection("sheets").updateOne({ _id: doc._id }, { $pull: { entries: null } })
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