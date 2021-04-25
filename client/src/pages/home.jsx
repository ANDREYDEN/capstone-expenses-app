import React from "react"
import ReactDOM from "react-dom"
import { Link, Redirect } from "react-router-dom"

import PullToRefresh from "react-simple-pull-to-refresh"
import SpinnerPreload from "../components/spinner.jsx"

import { getGroupMembers, getGroups } from "../api/index.js"

import ExpenseSheetList from "../components/expenseSheetList.jsx"
import HomeHeader from "../components/homeHeader.jsx"
import UserSummary from "../components/userSummary.jsx"
import HomeFooter from "../components/homeFooter.jsx"

export default class Home extends React.Component {
  constructor(props) {
    super(props)
    this.groupId = null
  }
  componentDidMount() {
    getGroups().then(res => {
      this.globalState.set({ groups: res.data.groups })
    }).catch(console.log)
  }

  componentDidUpdate() {
    const groupId = this.props.match.params.id
    if (groupId && groupId !== this.groupId) {
      this.groupId = groupId
      getGroupMembers(this.groupId).then(res => {
        this.globalState.set({
          members: { [this.groupId]: res.data.members }
        })
      }).catch(console.error)
    }
  }

  render() {
    const groupId = this.props.match.params.id || this.globalState.get("selectedGroupId")
    const groups = this.globalState.get("groups")
    if (!groupId && groups?.[0]) {
      return <Redirect to={{pathname: `/home/${groups[0]._id}`}} />
    }
    return (
      <main className="has-footer">
        <PullToRefresh onRefresh={() => new Promise(window.location.reload())} pullingContent="" refreshingContent={<SpinnerPreload />}>
          <HomeHeader groupId={groupId}/>
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
        </PullToRefresh>
        <HomeFooter active="home" groupId={groupId}/>
      </main>
    )
  }
}
