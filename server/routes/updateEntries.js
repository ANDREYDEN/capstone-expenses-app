const {
  retrieveDataFrom,
  idFromString,
  stringFromId
} = require("../src/utils.js")

exports.updateEntries = {
  type: "post",
  path: "/sheets/updateEntries/:id",
  authNeeded: true,
  callback: async function updateEntries(req, res) {
    try {
      const { entries } = await retrieveDataFrom(req)
      if (!req?.params?.id || !entries?.length) {
        res.status(400)
        res.send({ error: "Bad request" })
        res.end()
        return
      }

      const email = req.email
      const user = await global.db.collection("users").findOne({ email })
      const sheet = await global.db.collection("sheets").findOne({ _id: idFromString(req.params.id) })
      const group = await global.db.collection("groups").findOne({ _id: idFromString(sheet.groupId) })
      if (!user || !group || !group.userIds.map(stringFromId).includes(stringFromId(user._id))) {
        res.status(403)
        res.send("Forbidden")
        res.end()
        return
      }

      if (!sheet) {
        res.status(404)
        res.send("Sheet is not found")
        res.end()
        return
      }

      const update = {}
      entries.forEach(({ index, entry })=> {
        if (!index || index > sheet.entries.length) {
          return
        }
        // TODO: add validation for name, price
        if (entry.name !== undefined) { update[`entries.${index}.name`] = entry.name }
        if (entry.price !== undefined) { update[`entries.${index}.price`] = entry.price }
        if (entry.userCheckedIds?.[user._id] !== undefined) { update[`entries.${index}.userCheckedIds.${user._id}`] = entry.userCheckedIds[user._id] }
      })

      await global.db.collection("sheets").updateOne({ _id: sheet._id }, { $set: update })
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