import { differ, debounce } from  "../utils.js"

import chai from "chai"
const expect = chai.expect

describe("utils", () => {
  describe("#differ", () => {
    it("Should return empy object of no difference found", () => {
      expect(differ({ f1: "hi" }, { f1: "hi" })).to.eql({})
    })
  })
})