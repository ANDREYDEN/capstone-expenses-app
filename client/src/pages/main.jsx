import React from "react"
import ReactDOM from "react-dom"
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom"
import GoogleSignOut from "../components/googleSignOut.jsx"
import Home from "../pages/home.jsx"
import ExpenseSheet from "../pages/expenseSheet.jsx"

export default class Main extends React.Component {
  componentDidMount() {
  }

  render() {
    const signedWithGoogle = document.cookie.split("; ").reduce((memo, cookie) => {
      const [name, value] = cookie.split("=")
      return memo || (name === "tokenId" && value)
    }, false)
    const googleLogout = <GoogleSignOut  logout={this.props.logout}/>
    const logoutButton = signedWithGoogle ? googleLogout : null
    return (
      <Router>
        <Route exact path="/home">
          <Home />
          {logoutButton}
        </Route>
        <Route exact path="/sheets/:id" component={ExpenseSheet} />
      </Router>
    )
  }
}
