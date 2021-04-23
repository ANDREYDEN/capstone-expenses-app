import React from "react"
import ReactDOM from "react-dom"
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom"
import Home from "../pages/home.jsx"
import ExpenseSheet from "../pages/expenseSheet.jsx"
import Balances from "../pages/balances.jsx"
import PayBalances from "../pages/payBalances.jsx"
import PayBalanceFull from "../pages/payBalanceFull.jsx"
import JoinGroup from "../pages/joinGroup.jsx"
import NewExpenseSheet from "../pages/newExpenseSheet.jsx"
import GroupManager from "../pages/groupManager.jsx"
import ExpenseSheets from "../pages/expenseSheets.jsx"
import UserProfile from "../pages/userProfile.jsx"

export default class Main extends React.Component {
  componentDidMount() {
  }

  render() {
    return (
      <Router>
        <Route path="/home/:id?" component={Home}/>
        <Route exact path="/new/sheets/:id" component={NewExpenseSheet} />
        <Route exact path="/sheets/:id" component={ExpenseSheet} />
        <Route exact path="/groups/:id?/:view?" component={GroupManager} />
        <Route exact path="/balances/:id?" component={Balances} />
        <Route exact path="/payBalances/:id?" component={PayBalances} />
        <Route exact path="/payBalanceFull/:id?" component={PayBalanceFull} />
        <Route exact path="/join/:token" component={JoinGroup} />
        <Route exact path="/expenses/:id" component={ExpenseSheets} />
        <Route exact path="/profile" component={UserProfile} />
      </Router>
    )
  }
}
