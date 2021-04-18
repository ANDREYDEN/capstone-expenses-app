import React from "react"
import ReactDOM from "react-dom"
import { Link } from "react-router-dom"
import { createNewExpenseSheet, retrieveExpenseSheets } from "../api/index.js"
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
      retrieveExpenseSheets(this.props.groupId).then((res) => {
        this.globalState.set({ sheets: res.data.expenseSheets })
      }).catch(err => console.error(err))
    }
  }

  addNewExpenseSheet() {
    // TODO: some nitifcation if success
    // TODO: redirect if successful
    createNewExpenseSheet(this.props.groupId).then(result => {
      const sheets = this.globalState.get("sheets")
      sheets.push(result.data.newSheet)
      this.globalState.set({ sheets })
    }).catch(err => console.error(err))
  }

  render() {
    const user = window.user()
    const items = (this.globalState.get("sheets") || []).map((sheet, index) => {
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
    });

    return (
      <div className="expense-sheet-list-container">
        <Link
          className="pay-balance-btn"
          to={{
            pathname: `/balances/${this.props.groupId}`,
          }}
        >Pay Balance</Link>
        <h2>Sheets</h2>
        <ul className="expense-sheet-list">
          {items}
        </ul>
        <button onClick={this.addNewExpenseSheet.bind(this)}>Add New One</button>
      </div>
    )
  }
}
