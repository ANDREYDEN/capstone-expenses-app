import React from "react"
import ReactDOM from "react-dom"
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom"
import GoogleSignOut from "../components/googleSignOut.jsx"
import Home from "../pages/home.jsx"
import ExpenseSheet from "../pages/expenseSheet.jsx"
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
    const googleLogout = <GoogleSignOut  key="google-logout" logout={this.props.logout}/>
    const logoutButton = signedWithGoogle ? googleLogout : null
    return (
      <Router>
        <Route path="/home/:id?" component={Home}/>
        <Route exact path="/sheets/:id" component={ExpenseSheet} />
        <Route exact path="/balances" component={Balances} />
        <Route exact path="/payBalances" component={PayBalances} />
        <Route exact path="/payBalanceFull" component={PayBalanceFull} />
      </Router>
    )
  }
}
