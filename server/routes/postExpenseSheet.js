
const {
  retrieveDataFrom
} = require("../src/utils.js")

exports.postExpenseSheet = {
  type: "post",
  path: "/sheets/new",
  authNeeded: true,
  callback: async function postExpenseSheet(req, res) {
    try {
      const data = await retrieveDataFrom(req)
      const email = req.email
      const user = await global.db.collection("users").findOne({ email })
      if (!user) {
        res.status(403)
        res.send({ error: "Forbidden" })
        res.end()
        return
      }
      const newExpenseSheetDoc = {
        name: "",
        store: "",
        createdAt: new Date(),
        createdBy: user._id,
        entries: [],
        taxIncluded: false,
        usersPaidIds: {},
        groupId: data.groupId
      }

      const inserted = await global.db.collection("sheets").insertOne(newExpenseSheetDoc)
      const newlyCreatedId = inserted.ops[0]._id
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