import React from "react"
import ReactDOM from "react-dom"
import ExpenseSheetList from "../components/expenseSheetList.jsx"
import GroupManager from "../components/groupManager.jsx"

export default class Home extends React.Component {
  componentDidMount() {
  }

  render() {
    return [
      <GroupManager />,
      <ExpenseSheetList />
    ]
  }
}
