const {
  retrieveDataFrom,
  idFromString
} = require("../src/utils.js")

exports.getExpenseSheet = {
  type: "get",
  path: "/sheets/:id",
  authNeeded: true,
  callback: async function getExpenseSheet(req, res) {
    try {
      const username = req.username
      console.log(req.params.id)
      // TODO: some security and restrictions so people cannot fetch something they do not have access to
      const doc = await global.db.collection("sheets").findOne({ _id: idFromString(req.params.id) })
      if (doc) {
        res.status(200)
        res.send({ message: "OK", expenseSheet: doc })
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