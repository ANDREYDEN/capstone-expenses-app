import React from "react"
import ReactDOM from "react-dom"
import ExpenseSheetList from "../components/expenseSheetList.jsx"
import GroupManager from "../components/groupManager.jsx"

export default class Home extends React.Component {
  componentDidMount() {
  }

  render() {
    return (
      <main>
        <GroupManager groupId={this.props.match.params.id}/>
        <a href="/balances" type="button">Pay Balance</a>
        <ExpenseSheetList groupId={this.props.match.params.id}/>
      </main>
    )
  }
}
