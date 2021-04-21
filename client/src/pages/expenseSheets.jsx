import React from "react"
import ReactDOM from "react-dom"
import { Link } from "react-router-dom"

import { retrieveExpenseSheets, getGroup } from "../api/index.js"

import ExpenseSheetList from "../components/expenseSheetList.jsx"
import HomeFooter from "../components/homeFooter.jsx"

import "../styles/expenseSheets.scss"

const allTab = {
  name: "All",
  id: "all",
  filterFn: function(sheet) {
    return true
  }
}
const inProgressTab = {
  name: "In Progress",
  id: "progress",
  filterFn: function(sheet) {
    return Object.keys(sheet.usersPaidIds).length < (this.state.group.userIds?.length || 0)
  }
}
const finishedTab = {
  name: "Finished",
  id: "finished",
  filterFn: function(sheet) {
    return Object.keys(sheet.usersPaidIds).length >= (this.state.group.userIds?.length || 0)
  }
}

export default class ExpenseSheets extends React.Component {
  constructor(props) {
    super(props)

    this.groupId = props.match.params.id
    this.state = {
      activeTab: "all",
      group: {}
    }
  }

  componentDidMount() {
    retrieveExpenseSheets(this.groupId).then((res) => {
      this.globalState.set({ sheets: res.data.expenseSheets })
    }).catch(err => console.error(err))
    getGroup(this.groupId).then(res => {
      this.setState({
        group: res.data.group
      })
    }).catch(console.error)
  }

  changeTab(id) {
    this.setState({ activeTab: id })
  }

  render() {
    const tabHeders = [allTab, inProgressTab, finishedTab].map(tab => {
      return (
        <li
          key={tab.id}
          className={`tab-header ${this.state.activeTab === tab.id ? "active" : ""}`}
          onClick={this.changeTab.bind(this, tab.id)}
        >
          <span className="tab-name">{tab.name}</span>
        </li>
      )
    })
    const sheets = this.globalState.get("sheets") || []
    const tabs = [allTab, inProgressTab, finishedTab].map(tab => {
      return (
        <div
          className={`tab-content ${this.state.activeTab === tab.id ? "active" : ""}`}
          key={tab.id}
        >
          <ExpenseSheetList
            groupId={this.groupId}
            sheets={sheets.filter(tab.filterFn.bind(this))}
          />
        </div>
      )
    })
    return (
      <main className="expense-sheets-page has-footer">
        <h1>Expenses</h1>
        <div className="expense-sheets-tabs">
          <ul className="headers">
            {tabHeders}
          </ul>
          <div className="tabs">
            {tabs}
          </div>
        </div>

        <Link
          className="add-item-btn"
          to={{ pathname: `/new/sheets/${this.groupId}`}}>
          + New Expense
        </Link>

        <HomeFooter active="expenses" groupId={this.groupId}/>
      </main>
    )
  }
}
