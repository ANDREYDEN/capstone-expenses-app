import React from "react"
import ReactDOM from "react-dom"
import ExpenseSheetList from "../components/expenseSheetList.jsx"
import HomeHeader from "../components/homeHeader.jsx"
import UserSummary from "../components/userSummary.jsx"

export default class Home extends React.Component {
  componentDidMount() {
  }

  render() {
    const groupId = this.props.match.params.id || this.globalState.get("selectedGroupId")
    return (
      <main>
        <HomeHeader groupId={groupId}/>
        <UserSummary groupId={groupId}/>
        <ExpenseSheetList groupId={groupId}/>
      </main>
    )
  }
}
