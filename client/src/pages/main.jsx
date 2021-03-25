import React from "react"
import ReactDOM from "react-dom"
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom"
import ExpenseSheetList from "../components/expenseSheetList.jsx"
import ExpenseSheet from "../pages/expenseSheet.jsx"
import GoogleSignOut from "../components/googleSignOut.jsx"

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
        </Router>
      </main>
    )
  }
}
