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
    // This is a factory to access global state
    // Global state acts as normal state when is used inside of rendered function
    // Usage:
    // in constructor: this.globalState = this.createStateDependecy(this)
    // in where ever: this.globalState.set({ propName: prop })
    // in rendered: this.globalState.get("propName")
    //
    // This is nice because multiple components may use the same data reactively
    //
    // NOTE: there might be a way to do it easier. This might be redone in the future
    // this.appState = {}
    // this.dependecies = {}
    // React.Component.prototype.createStateDependecy = (component) => {
    //   return {
    //     get: (key) => {
    //       if (!this.dependecies[key]) {
    //         this.dependecies[key] = new Set()
    //       }
    //       if (!this.dependecies[key].has(component)) {
    //         console.log(`Registered globalState dependecy of ${key}`, component)
    //         this.dependecies[key].add(component);
    //       }
    //       const stateValue = component.state[key]
    //       return stateValue || this.appState[key]
    //     },
    //     set: (state) => {
    //       const newState = {}
    //       for (let key in state) {
    //         if (this.appState[key] !== state[key]) {
    //           newState[key] = state[key]
    //         }
    //       }
    //       for (let key in this.dependecies) {
    //         this.dependecies[key].forEach(component => { component.setState(newState) })
    //       }
    //       for (let key in newState) {
    //         this.appState[key] = newState[key]
    //       }
    //     }
    //   }
    // }
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
