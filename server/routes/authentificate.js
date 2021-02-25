// NOTE: Basically this get's called when people get into our app
//  { authNeeded: true } so if it passes means that people have valid token
exports.authentificate = {
  type: "get",
  path: "/authentificate",
  authNeeded: true,
  callback: async function authentificate(req, res) {
    try {
      res.status(200)
      res.send({ message: "OK" })
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