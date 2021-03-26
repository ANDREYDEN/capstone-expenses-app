
exports.payBalance = {
  type: "post",
  path: "/payBalance",
  authNeeded: true,
  callback: async function oauth(req, res) {
    try {
      const { tokenId, platform } = await retrieveDataFrom(req)
      res.status(200)
      res.cookie("tokenId", tokenId, { expires: new Date(Date.now() + 24 * 60 * 60 * 1000) })
      res.send({ OK: "Authorized Successfully", user: userObj })
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