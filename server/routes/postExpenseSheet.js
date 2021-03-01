
const {
  retrieveDataFrom
} = require("../src/utils.js")

exports.postExpenseSheet = {
  type: "post",
  path: "/sheets/new",
  authNeeded: true,
  callback: async function postExpenseSheet(req, res) {
    try {
      const username = req.username
      const newExpenseSheetDoc = {
        name: "",
        store: "",
        createdAt: new Date(),
        createdBy: username,
        entries: [],
        taxIncluded: false,
        usersPaidIds: []
      }

      const inserted = await global.db.collection("sheets").insertOne(newExpenseSheetDoc)
      const newlyCreatedId = inserted.ops[0]._id
      res.status(200)
      res.send({ message: "Expense sheet created successfully", newSheetId: newlyCreatedId })
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