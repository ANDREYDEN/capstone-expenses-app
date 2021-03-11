import React from "react"
import ReactDOM from "react-dom"
import { BrowserRouter as Router, Route } from "react-router-dom";
import { createNewExpenseSheet, retrieveExpenseSheets } from "../api/index.js"
import axios from "axios"

export default class ExpenseSheetList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      sheets: []
    }
    this.groupId = "6036d85f7e0fff3b44e09391"
  }
  addNewExpenseSheet() {
    // TODO: some nitifcation if success
    // TODO: redirect if successful
    createNewExpenseSheet(this.groupId).then(result => console.log(result)).catch(err => console.error(err))
  }
  retrieveExpenseSheets() {
    // TODO: this should be executed on start
    retrieveExpenseSheets(this.groupId).then((res) => {
      this.setState({ sheets: res.data.expenseSheets })
    }).catch(err => console.error(err))
  }

  render() {
    const user = JSON.parse(localStorage.getItem("user"))
    const summary = this.state.sheets.reduce((memo, sheet) => {
      //TODO: filter only sheets that all users marked as completed
      const userOwes = sheet.entries.reduce((sum, entry) => {
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
      return (
        <li key={index}>
          <a href={"/sheets/" + sheet._id}>
            {index + 1}.{`${sheet.name} by ${sheet.createdBy}`}
          </a>
          {` ${summary[sheet._id] > 0 ? "you own:" : "you owe:"} ${Math.abs(summary[sheet._id])}`}
        </li>
      )
    });
    return (
      <div className="expense-sheet-container">
        <ul>
          {items}
          <li>Total: {summary.total > 0 ? "you own" : "you owe"} $ {Math.abs(summary.total)}</li>
          <li>
            <button onClick={this.addNewExpenseSheet.bind(this)}>Add New One</button>
            <br/>
            <button onClick={this.retrieveExpenseSheets.bind(this)}>Show Spreadsheets</button>

          </li>
        </ul>
      </div>
    )
  }
}
