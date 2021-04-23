
const {
  retrieveDataFrom,
  makeHashOf,
  SALT_ROUNDS,
  randomColor,
  generateAccessTokenFor
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
        groupIds: [],
        color: randomColor()
      })

      const user = inserted.ops[0]
      const groupDoc = {
        name: `${user.name}'s Group`,
        createdBy: user._id,
        userIds: [user._id]
      }
      const groupInserted = await global.db.collection("groups").insertOne(groupDoc)
      const initialGroup = groupInserted.ops[0]
      await global.db.collection("users").updateOne({ _id: user._id }, { $push: { groupIds: initialGroup._id } })

      const token = generateAccessTokenFor({ email, name: user.name })
      if (token && user) {
        const userObj = { _id: user._id, name: user.name, email, color: user.color }
        res.cookie('jwt', token, { expires: new Date(Date.now() + 60 * 60 * 1000) })
        res.status(200)
        res.send({ message: "User was created successfully!", jwt: token, user: userObj })
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
