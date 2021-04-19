
exports.getGroups = {
  type: "get",
  path: "/groups/",
  authNeeded: true,
  callback: async function getGroups(req, res) {
    try {
      const email = req.email
      // TODO: some security and restrictions so people cannot fetch something they do not have access to
      const user = await global.db.collection("users").findOne({ email })
      if (!user) {
        res.status(403)
        res.send({ message: "Forbidden" })
        res.end()
      }
      const cursor = global.db.collection("groups").find({ _id: { $in: user.groupIds } });
      const groups = await cursor.toArray();

      res.status(200)
      res.send({ message: "OK", groups })
      res.end()
      return
    }
    catch (err) {
      console.error(err)
      res.status(500)
      res.send({ error: "Internal server error" })
      res.end()
    }
  }
}
