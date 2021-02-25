import React from "react"
import ReactDOM from "react-dom"
import { BrowserRouter as Router, Route } from "react-router-dom";
import { createNewExpenceSheet, retrieveExpenseSheet } from "../api/index.js"
import axios from "axios"

export default class ExpenceSheetList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      sheets: []
    }
  }
  addNewExpenceSheet() {
    // TODO: some nitifcation if success
    // TODO: redirect if successful
    createNewExpenceSheet().then(result => console.log(result)).catch(err => console.error(err))
  }
  retrieveExpenseSheets() {
    // TODO: this should be executed on start
    retrieveExpenseSheet().then((res) => {
      this.setState({ sheets: res.data.expenseSheets })
    }).catch(err => console.error(err))
  }

  render() {
    const items = this.state.sheets.map((sheet, index) => { 
      return (
        <li key={index}>
          <a href="/sheets/{sheet._id}"></a>{index + 1}.{sheet._id}
        </li>
      )
    });

    const groupId = "6036d85f7e0fff3b44e09391";

    return (
      <div className="expence-sheet-container">
        <ul>
          {items}
          <li>
            <button onClick={this.addNewExpenceSheet}>Add New One</button>
            <br/>
            <button onClick={this.retrieveExpenseSheets.bind(this)}>Open Spreadsheet</button>

          </li>
        </ul>
      </div>
    )
  }
}
