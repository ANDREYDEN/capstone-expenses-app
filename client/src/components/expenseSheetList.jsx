import React from "react"
import ReactDOM from "react-dom"
import { Link } from "react-router-dom"
import { retrieveExpenseSheets, getGroupMembers } from "../api/index.js"
import "../styles/expenseSheetList.scss"

export default class ExpenseSheetList extends React.Component {
  constructor(props) {
    super(props)
    this.groupId = null
  }

  componentDidMount() {
  }

  componentDidUpdate() {
    if (this.groupId !== this.props.groupId) {
      this.groupId = this.props.groupId
      if (!this.props.sheets) {
        // NOTE: might fix this behaviuor in the future. If this is on the home page we want to do this
        //    We will have multiple ExpenseSheetList's on the expenseSheets page
        //    We do not want to fetch the sheets more than once
        retrieveExpenseSheets(this.props.groupId).then((res) => {
          this.globalState.set({ sheets: res.data.expenseSheets })
        }).catch(err => console.error(err))
      }
    }
  }

  render() {
    const userId = window.userId()
    const members = this.globalState.get("members") || []
    const items = (this.props.sheets || this.globalState.get("sheets") || []).map((sheet, index) => {
      const date = new Date(sheet.createdAt)
      const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
      const niceDate = `${months[date.getMonth()]} ${date.getDate()}`
      const createdBy = members.find(m => m._id === sheet.createdBy)?.name || "Unknown"
      // TODO: state need a discussion. What is exact criteria for it?
      let state = "logged"
      for (let entry of sheet.entries) {
        if (!(userId in entry.userCheckedIds)) {
          state = "created"
        }
      }
      if (!sheet.entries.length) {
        state = "created"
      }
      if (sheet.usersPaidIds[userId]) {
        state = "paid"
      }
      if (Object.keys(sheet.usersPaidIds).length >= members.length) {
        state = "finalized"
      }

      return (
        <li className="expense-sheet-item" key={index}>
          <Link to={`/sheets/${sheet._id}`}>
            <div className="sheet-info">
              <span className="sheet-name">{sheet.name}</span>
              <span className="details">
                <span>{niceDate}</span>
                <span className="dot">・</span>
                <span>{createdBy}</span>
              </span>
            </div>
            <div className="sheet-state-badge">
              <span className={`state ${state}`}>{state}</span>
            </div>
          </Link>
        </li>
      )
    });

    return (
      <div className="expense-sheet-list-container">
        <ul className="expense-sheet-list">
          {items}
        </ul>
      </div>
    )
  }
}
