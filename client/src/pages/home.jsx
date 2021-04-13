import React from "react"
import ReactDOM from "react-dom"
import ExpenseSheetList from "../components/expenseSheetList.jsx"
import GroupManager from "../components/groupManager.jsx"
import UserSummary from "../components/userSummary.jsx"

export default class Home extends React.Component {
  componentDidMount() {
  }

  render() {
    const groupId = this.props.match.params.id || this.globalState.get("selectedGroupId")
    return (
      <main>
        <GroupManager groupId={groupId}/>
        <UserSummary groupId={groupId}/>
        <ExpenseSheetList groupId={groupId}/>
      </main>
    )
  }
}
