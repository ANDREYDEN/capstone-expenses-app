const {
  retrieveDataFrom,
  idFromString
} = require("../src/utils.js")

exports.updateExpenseSheet = {
  type: "post",
  path: "/sheets/update/:id",
  authNeeded: true,
  callback: async function updateExpenseSheet(req, res) {
    try {
      const username = req.username
      const data = await retrieveDataFrom(req)
      // TODO: some security so only users that have access can update the document
      // TODO: some update validation
      const update = {}
      if (data.name !== undefined) { update.name = data.name }
      if (data.store !== undefined) { update.store = data.store }
      if (data.taxIncluded !== undefined) { update.taxIncluded = data.taxIncluded }

      if (!req?.params?.id) {
        res.status(400)
        res.send({ error: "bad request" })
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
      await global.db.collection("sheets").updateOne({ _id: doc._id }, { $set: update })
      res.status(200)
      res.send({ message: "Expense sheet updated successfully" })
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