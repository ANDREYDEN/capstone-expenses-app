import React from "react"
import ReactDOM from "react-dom"
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom"
import { authentificate } from "../api/index.js"
import SignUpModule from "../pages/signup.jsx"
import MainPage from "../pages/main.jsx"
import SpinnerPreload from "../components/spinner.jsx"
import { deleteCookie } from "../utils.js"


export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      verifiedLogin: false,
      loggedIn: false
    }
    React.Component.prototype.globalState = {
      get: (key) => {
        return this.state[key]
      },
      set: (state) => {
        this.setState(state)
      }
    }
  }

  onSuccessfulLogin() {
    // NOTE: this is callback that is called when we successfully log in in the signUpModule
    this.setState({
      loggedIn: true
    })
  }
  onSuccessfulLogout(tokenName) {
    document.cookie = `${tokenName}=`
    this.setState({
      loggedIn: false
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
            {loggedIn ? <Redirect to="/home" /> : <SignUpModule loginCallback={this.onSuccessfulLogin.bind(this)}/>}
          </Route>
          {["/home", "/sheets"].map((path, index) =>
            <Route path={path} key={index}>
              {loggedIn ? <MainPage logout={this.onSuccessfulLogout.bind(this)}/> : <Redirect to="/signin" />}
            </Route>
          )}
          <Route exact path="/">
            <Redirect to="/home" />
          </Route>
        </Router>
      )
    }
    return (
      <SpinnerPreload />
    )
  }
}
