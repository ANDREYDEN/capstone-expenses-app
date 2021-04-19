
const {
  retrieveDataFrom
} = require("../src/utils.js")

exports.postExpenseSheet = {
  type: "post",
  path: "/sheets/new",
  authNeeded: true,
  callback: async function postExpenseSheet(req, res) {
    try {
      const { groupId, sheet } = await retrieveDataFrom(req)
      const email = req.email
      const user = await global.db.collection("users").findOne({ email })
      if (!user) {
        res.status(403)
        res.send({ error: "Forbidden" })
        res.end()
        return
      }
      // TODO: validating if user belongs to group
      const newExpenseSheetDoc = {
        store: sheet.store,
        createdAt: new Date(),
        purchaseDate: sheet.date,
        createdBy: user._id,
        entries: [],
        tax: sheet.tax || 0,
        usersPaidIds: {},
        groupId
      }
      const inserted = await global.db.collection("sheets").insertOne(newExpenseSheetDoc)
      res.status(200)
      res.send({ message: "Expense sheet created successfully", newSheet: inserted.ops[0] })
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