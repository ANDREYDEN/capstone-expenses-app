import { differ, debounce, differDeep } from  "../utils.js"

import chai from "chai"
const expect = chai.expect

describe("utils", () => {
  describe("#differ", () => {
    it("Should return empty object if no difference found", () => {
      expect(
        differ({ f1: "hi" }, { f1: "hi" })
      ).to.eql({})
    })
    it("Should return empty object if new object second object lacks some fields", () => {
      expect(
        differ({ f1: "hi", f2: "h2 is here" }, { f1: "hi" })
      ).to.eql({})
    })
    it("Should return object containing missmach in the fields between 2 objects", () => {
      expect(
        differ({ f1: "hi" }, { f1: "hello" })
        ).to.eql({ f1: "hello" })
    })
    it("Should return object containing any new fileds added in the second object", () => {
      expect(
        differ({ f1: "hi" }, { f1: "hi", f2: "f2 in obj2" })
      ).to.eql({ f2: "f2 in obj2" })
    })
    it("Should return mismatch in existing objects and new fields introduced in the second object", () => {
      expect(differ({ f1: "hi" }, { f1: "hello", f2: "f2 in obj2" })).to.eql({ f1: "hello", f2: "f2 in obj2" })
    })
  })
  describe("#differDeep", () => {
    it("Should return empty object if no difference found", () => {
      expect(
        differDeep({ f1: "hi" }, { f1: "hi" })
      ).to.eql({})
    })
    it("Should return empty object if new object second object lacks some fields", () => {
      expect(
        differDeep({ f1: "hi", f2: "h2 is here" }, { f1: "hi" })
      ).to.eql({})
    })
    it("#1 Should return deep difference in child objects as well as any added fields", () => {
      expect(
        differDeep({ f1: { a: "a", b: "b" }, f2: "h2 is here" }, { f1: { a: "aa", b: "b", c: "c"} })
      ).to.eql({ f1: { a: "aa", c: "c"} })
    })
    it("#2 Should return deep difference in child objects as well as any added fields", () => {
      expect(
        differDeep({ f1: { a: { b: "b", c: "c" }, d: 1 }, f2: 2 }, { f1: { a: { b: "bb", c: "c" }, d: 2 }, f2: 3 })
      ).to.eql({ f1: { a: { b: "bb" }, d: 2 }, f2: 3 })
    })
  })
  describe("#debounce", () => {
    it("Should call function at least after 500ms", () => {
      let calledAt = Date.now()
      const call = debounce(() => {
        if (call) {
          expect(Date.now() - 500).to.be.above(calledAt - 1)
        }
      }, 500)
      calledAt = Date.now()
      call()
    })
    it("Should delay the function after 300ms again so much be called at least in 800ms", () => {
      let calledAt = Date.now()
      const call = debounce(() => {
        if (call) {
          expect(Date.now() - 800).to.be.above(calledAt - 1)
        }
      }, 500)
      calledAt = Date.now()
      call()
      setTimeout(call, 300);
    })
  })
})