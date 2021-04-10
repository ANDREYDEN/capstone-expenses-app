import React from "react"
import ReactDOM from "react-dom"
import { FaChevronDown } from "react-icons/fa"

import Spinner from "./spinner.jsx"

export default class UserSummary extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const sheets = this.globalState.get("sheets") || []
    console.log(sheets)
    const userId = JSON.parse(window.localStorage.getItem("user"))._id
    const memeberSummary = sheets.reduce((memo, sheet) => {
      //TODO: filter only sheets that all users marked as completed
      const userOwes = sheet.usersPaidIds[userId] ? 0 : sheet.entries.reduce((sum, entry) => {
        if (entry.userCheckedIds[userId]) {
          sum += (entry.price || 0) / Object.keys(entry.userCheckedIds).filter(key => entry.userCheckedIds[key]).length
        }
        return sum
      }, 0)
      memo[sheet.createdBy] = userOwes
      return memo
    }, { })
    console.log(memeberSummary)
    return (
      <div className="user-summary">
        <Spinner />
      </div>
    )
  }
}
