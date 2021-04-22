import React from "react"
import ReactDOM from "react-dom"
import { Link } from "react-router-dom"

import { getGroupMembers } from "../api/index.js"

import ExpenseSheetList from "../components/expenseSheetList.jsx"
import GroupManager from "../components/groupManager.jsx"
import UserSummary from "../components/userSummary.jsx"
import HomeFooter from "../components/homeFooter.jsx"

export default class Home extends React.Component {
  componentDidMount() {
    const groupId = this.props.match.params.id || this.globalState.get("selectedGroupId")
    getGroupMembers(groupId).then(res => {
      this.globalState.set({
        members: res.data.members
      })
    }).catch(console.error)
  }

  render() {
    const groupId = this.props.match.params.id || this.globalState.get("selectedGroupId")
    return (
      <main className="has-footer">
        <GroupManager groupId={groupId}/>
        <UserSummary groupId={groupId}/>
        <div className="home-section">
          <Link
            className="pay-balance-btn"
            to={{
              pathname: `/balances/${groupId}`,
            }}
          >Pay Balance</Link>
          <h2 className="home-headline">Activity</h2>
        </div>
        <ExpenseSheetList groupId={groupId}/>
        <HomeFooter active="home" groupId={groupId}/>
      </main>
    )
  }
}
