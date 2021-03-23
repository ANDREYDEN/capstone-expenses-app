
const {
  retrieveDataFrom,
  makeHashOf,
  SALT_ROUNDS
} = require("../src/utils.js")

exports.signUp = {
  type: "post",
  path: "/signup",
  authNeeded: false,
  callback: async function signUp(req, res) {
    try {
      const { username, email, password } = await retrieveDataFrom(req)
      const encrypredPassword = await makeHashOf(password, SALT_ROUNDS)
      const exists = await global.db.collection("users").findOne({ email })

      if (exists) {
        res.status(409)
        res.send({ error: "Username is already taken." })
        res.end()
        return
      }
      const inserted = await global.db.collection("users").insertOne({
        name: username,
        email: email,
        password: {
          saltRounds: SALT_ROUNDS,
          hash: encrypredPassword
        },
        groupIds: []
      })
      if (inserted) {
        res.status(200)
        res.send({ message: "User was created successfully!" })
        res.end()
      }
    }
    catch (err) {
      console.error(err)
      res.status(500)
      res.send({ error: "Internal server error" })
      res.end()
    }
  }
}
