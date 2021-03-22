const {
  retrieveDataFrom
} = require("../src/utils.js")

exports.getExpenseSheets = {
  type: "get",
  path: "/sheets",
  authNeeded: true,
  callback: async function getExpenseSheets(req, res) {
    try {
      const groupId = req.query.groupId
      // TODO: add sicurity
      const cursor = global.db.collection("sheets").find({ groupId })
      const expenseSheets = await cursor.toArray();

      res.status(200)
      res.send({ message: "Expense sheet was received", expenseSheets: expenseSheets })
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