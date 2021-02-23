
const {
  retrieveDataFrom
} = require("../src/utils.js")

exports.postExpenceSheet = {
  type: "post",
  path: "/sheet/new",
  authNeeded: true,
  callback: async function postExpenceSheet(req, res) {
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
      // const user = await global.db.collection("users").findOne({ name: username })
      // if (!user) {
      //   res.status(404)
      //   res.send({ error: `User ${username} is not found` })
      //   res.end()
      //   return
      // }

      // const passwordMatch = await passwordsMatch(password, user.password.hash)
      // if (!passwordMatch) {
      //   res.status(403)
      //   res.send({ error: `Password mismatch` })
      //   res.end()
      //   return
      // }

      // const token = generateAccessTokenFor(username)
      // if (token) {
      //   res.status(200)
      //   res.cookie('jwt', token, { expires: new Date(Date.now() + 60 * 60 * 1000), secure: true })
      //   res.send({ OK: "Authorized Successfully", jwt: token })
      //   res.end()
      // }
    }
    catch (err) {
      console.error(err)
      res.status(500)
      res.send({ error: "Internal server error" })
      res.end()
    }
  }
}