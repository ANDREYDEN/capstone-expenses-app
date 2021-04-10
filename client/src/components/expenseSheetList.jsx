import React from "react"
import ReactDOM from "react-dom"
import { Link } from "react-router-dom"
import { createNewExpenseSheet, retrieveExpenseSheets } from "../api/index.js"
import "../styles/expenseSheetList.scss"

export default class ExpenseSheetList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      sheets: []
    }
    this.groupId = this.props.groupId
  }

  componentDidMount() {
  }

  componentDidUpdate() {
    if (this.groupId !== this.props.groupId) {
      this.groupId = this.props.groupId
      retrieveExpenseSheets(this.groupId).then((res) => {
        this.setState({ sheets: res.data.expenseSheets })
      }).catch(err => console.error(err))
    }
  }

  addNewExpenseSheet() {
    // TODO: some nitifcation if success
    // TODO: redirect if successful
    createNewExpenseSheet(this.groupId).then(result => {
      const sheets = this.state.sheets
      sheets.push(result.data.newSheet)
      this.setState({ sheets })
    }).catch(err => console.error(err))
  }

  render() {
    const user = JSON.parse(localStorage.getItem("user"))
    const summary = this.state.sheets.reduce((memo, sheet) => {
      //TODO: filter only sheets that all users marked as completed
      const userOwes = sheet.usersPaidIds[user._id] ? 0 : sheet.entries.reduce((sum, entry) => {
        if (entry.userCheckedIds[user._id]) {
          sum += (entry.price || 0) / Object.keys(entry.userCheckedIds).filter(key => entry.userCheckedIds[key]).length
        }
        return sum
      }, 0)
      let userOwns = 0
      // TODO: must be changed to id and the same on the backend
      // TODO: consider adding a new filed something like createdByName so we do not have to lookup
      if (sheet.createdBy === user.name) {
        userOwns = sheet.entries.reduce((sum, entry) => {
          sum += entry.price || 0
          return sum
        }, 0)
      }
      memo[sheet._id] = userOwns - userOwes
      memo.total += userOwns - userOwes
      return memo
    }, { total: 0 })

      const items = this.state.sheets.map((sheet, index) => {
      const date = new Date(sheet.createdAt)
      const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
      const niceDate = `${months[date.getMonth()]} ${date.getDate()}`
      return (
        <li className="expense-sheet-item" key={index}>
          <Link to={`/sheets/${sheet._id}`}>
            <div className="sheet-info">
              <span className="sheet-name">{sheet.name}</span>
              <span className="details">
                <span>{niceDate}</span>
                <span className="dot">・</span>
                <span>{sheet.createdBy}</span>
              </span>
            </div>
            <div className="sheet-state-badge">
              <span className="state">state</span>
            </div>
          </Link>
        </li>
      )
      // {` ${summary[sheet._id] > 0 ? "you own:" : "you owe:"} ${Math.abs(summary[sheet._id])}`}
    });

    return (
      <div className="expense-sheet-container">
        <Link
          className="pay-balance-btn"
          to={{
            pathname: `/balances/${this.groupId}`,
          }}
        >Pay Balance</Link>
        <h2>Sheets</h2>
        <ul className="expense-sheet-list">
          {items}
          <li>Total: {summary.total > 0 ? "you own" : "you owe"} $ {Math.abs(summary.total)}</li>
        </ul>
        <button onClick={this.addNewExpenseSheet.bind(this)}>Add New One</button>
      </div>
    )
  }
}
