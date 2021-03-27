import React from "react"
import ReactDOM from "react-dom"
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom"
import ExpenseSheetList from "../components/expenseSheetList.jsx"
import ExpenseSheet from "../pages/expenseSheet.jsx"
import GoogleSignOut from "../components/googleSignOut.jsx"
import Balances from "../pages/balances.jsx"
import PayBalances from "../pages/payBalances.jsx"
import PayBalanceFull from "../pages/payBalanceFull.jsx"

export default class Main extends React.Component {
  componentDidMount() {
  }

  render() {
    const signedWithGoogle = document.cookie.split("; ").reduce((memo, cookie) => {
      const [name, value] = cookie.split("=")
      return memo || (name === "tokenId" && value)
    }, false)
    const googleLogout = <GoogleSignOut  logout={this.props.logout}/>
    const logoutButton = signedWithGoogle ? googleLogout : <div></div>
    return (
      <main>
        <Router>
          <Route exact path="/home">
            <ExpenseSheetList />
            <br/>
            <a href="/balances" type="button">Pay Balance</a>
            {logoutButton}
          </Route>
          <Route exact path="/sheets/:id" component={ExpenseSheet} />
          <Route exact path="/balances" component={Balances} />
          <Route exact path="/payBalances" component={PayBalances} />
          <Route exact path="/payBalanceFull" component={PayBalanceFull} />
        </Router>
      </main>
    )
  }
}
