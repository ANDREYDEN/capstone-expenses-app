const {
  retrieveDataFrom,
  idFromString
} = require("../src/utils.js")

exports.updateExpenseSheet = {
  type: "post",
  path: "/sheets/addEntry/:id",
  authNeeded: true,
  callback: async function updateExpenseSheet(req, res) {
    try {
      if (!req?.params?.id) {
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
      const newEntry =  {
        name: "", 
        price: 0,
        userCheckedIds: {}
      }
      await global.db.collection("sheets").updateOne({ _id: doc._id }, { $push: { entries: newEntry } })
      res.status(200)
      res.send({ message: "Added new entry successfully", entry: newEntry })
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