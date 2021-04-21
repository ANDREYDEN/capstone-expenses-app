import React from "react"
import ReactDOM from "react-dom"
import { Link } from "react-router-dom"
import ExpenseSheetList from "../components/expenseSheetList.jsx"
import GroupManager from "../components/groupManager.jsx"
import UserSummary from "../components/userSummary.jsx"
import HomeFooter from "../components/homeFooter.jsx"

export default class Home extends React.Component {
  componentDidMount() {
  }

  render() {
    const groupId = this.props.match.params.id || this.globalState.get("selectedGroupId")
    return (
      <main>
        <GroupManager groupId={groupId}/>
        <UserSummary groupId={groupId}/>
        <Link
          className="pay-balance-btn"
          to={{
            pathname: `/balances/${this.props.groupId}`,
          }}
        >Pay Balance</Link>
        <h2>Sheets</h2>
        <ExpenseSheetList groupId={groupId}/>
        <HomeFooter active="home"/>
      </main>
    )
  }
}
