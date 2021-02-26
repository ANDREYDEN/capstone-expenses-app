import React from "react"
import ReactDOM from "react-dom"
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import { authentificate } from "../api/index.js"
import SignUpModule from "../pages/signup.jsx"
import MainPage from "../pages/main.jsx"
import SpinnerPreload from "../components/spinner.jsx"


export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      verifiedLogin: false,
      loggedIn: false
    }
  }

  onSuccessfulLogin() {
    // NOTE: this is callback that is called then we successfully log in in the signUpModule
    this.setState({
      loggedIn: true
    })
  }

  componentDidMount() {
    authentificate().then(res => {
      console.log(res)
      this.setState({
        verifiedLogin: true,
        loggedIn: true
      })
    }).catch(err => {
      console.log(err)
      // TODO: catch 500 error - means the server is down
      // This should react only on 403 and 401
      this.setState({
        verifiedLogin: true,
        loggedIn: false
      })
    })
  }

  render() {

    const loggedIn = this.state.loggedIn
    const verifiedLogin = this.state.verifiedLogin

    if (verifiedLogin) {
      return (
        <Router>
          <Route path="/signin">
            {loggedIn ? <Redirect to="/" /> : <SignUpModule loginCallback={this.onSuccessfulLogin.bind(this)}/>}
          </Route>
          <Route path="/">
            {loggedIn ? <MainPage /> : <Redirect to="/signin" />}
          </Route>
        </Router>
      )
    }
    return (
      <SpinnerPreload />
    )
  }
}
