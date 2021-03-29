const {
  idFromString,
  retrieveDataFrom
} = require("../src/utils.js")

exports.payBalance = {
  type: "post",
  path: "/pay/sheets",
  authNeeded: true,
  callback: async function oauth(req, res) {
    try {
      const data = await retrieveDataFrom(req)
      const email = req.email
      //TODO: user validation
      const user = await global.db.collection("users").findOne({
        email
      })
      await global.db.collection("sheets").updateMany({ _id: { $in: data.map(idFromString) } }, { $set: { usersPaidIds: { [user._id]: true } } })
      res.status(200)
      res.send({ OK: "OK" })
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