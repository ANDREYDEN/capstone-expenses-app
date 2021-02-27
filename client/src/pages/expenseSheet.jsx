import React from "react"
import ReactDOM from "react-dom"
import axios from "axios"
import { useParams } from "react-router-dom"
import { getSheetById } from "../api/index.js"
import Spinner from "../components/spinner.jsx"

export default class ExpenseSheetList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      confirmedSheetWithServer: false,
      sheet: { 
        name: "",
        store: "",
        createdAt: "",
        createdBy: "",
        entries: [],
        taxIncluded: false,
        usersPaidIds: []
      }
    }
    this.sheetId = props.match.params.id

    this.sheetName = React.createRef()
    this.storeName = React.createRef()
    this.taxIncluded = React.createRef()
  }

  componentDidMount() {
    getSheetById(this.sheetId).then(res => {
      console.log(res)
      this.setState({
        serverConfirmed: true,
        sheet: res.data.expenseSheet
      })
    }).catch(err => {
      // TODO: user notifications
      this.setState({
        serverConfirmed: true,
        sheet: null
      })
      console.log(err)
    })
  }

  render() {
    if (this.state.serverConfirmed) {
      if (this.state.sheet) {
        const sheet = this.state.sheet
        return (
          <div className="expense-sheet-container">
            <label htmlFor="">Expense Sheet Name:</label>
            <input type="text" name="" ref={this.sheetName} defaultValue={sheet.name}/>
            <br/>
            <label htmlFor="">Store Name:</label>
            <input type="text" name="" ref={this.storeName} defaultValue={sheet.store}/>
            <br/>
            <label htmlFor="">Tax Included:</label>
            <input type="checkbox" name="" ref={this.taxIncluded}/>
            <br/>
            <span>Date: {sheet.createdAt}</span>
            <br/>
            <span>Created By: {sheet.createdBy}</span>

          </div>
        )
      }
      return (
        <div className="expense-sheet-container">
          Item is not found.
        </div>
      )
    }
    return <Spinner />

  }
}
