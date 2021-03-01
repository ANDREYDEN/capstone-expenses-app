const {
  retrieveDataFrom,
  idFromString
} = require("../src/utils.js")

exports.updateEntry = {
  type: "post",
  path: "/sheets/updateEntry/:id",
  authNeeded: true,
  callback: async function updateExpenseSheet(req, res) {
    try {
      const username = req.username
      const { entry, index } = await retrieveDataFrom(req)

      // TODO: add validation for name, price
      const update = {}
      if (entry.name !== undefined) { update[`entries.${index}.name`] = entry.name }
      if (entry.price !== undefined) { update[`entries.${index}.price`] = entry.price }

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
      // TODO: security so only users can check for themselves
      const group = await global.db.collection("groups").findOne({ _id: idFromString(doc.groupId) })
      group.userIds.forEach(userId => {
        if (entry?.userCheckedIds?.[userId] !== undefined) {
          update[`entries.${index}.userCheckedIds.${userId}`] = entry.userCheckedIds[userId]
        }
      })
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