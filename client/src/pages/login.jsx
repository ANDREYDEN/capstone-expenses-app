import React from "react"
import ReactDOM from "react-dom"

import { login, signup, oauth } from "../api/index.js"
import GoogleSignIn from "../components/googleSignIn.jsx"

export default class LoginModule extends React.Component {
  signUpHandler() {
    const name = document.getElementById("signup-name").value
    const password = document.getElementById("signup-password").value
    const email = document.getElementById("signup-email").value
    signup(email, name, password).then(res => console.log(res)).catch(err => console.log(err))
  }

  loginHandler() {
    const email = document.getElementById("login-email").value
    const password = document.getElementById("login-password").value
    
    login(email, password).then(res => {
      window.setUser(res.data.user)
      this.props.loginCallback()
    }).catch(err => {
      console.log(err)
    })
  }

  googleSignInHandler(response) {
    console.log(response)
    oauth(response.tokenId, "google").then(res => {
      window.setUser(res.data.user)
      this.props.loginCallback()
    }).catch(console.error)
  }

  render() {
    return (
      <div className="container">
        <div className="signup">
          <div className="row">
            <span>Name: </span> <input type="text" id="signup-name" />
          </div>
          <div className="row">
            <span>Email: </span> <input type="text" id="signup-email" />
          </div>
          <div className="row">
            <span>Password: </span> <input type="password" id="signup-password" />
          </div>
          <button id="signup-button" onClick={this.signUpHandler}>Sign Up</button>
        </div>
        <div className="login">
          <div className="row">
            <span>Email </span> <input type="text" id="login-email" />
          </div>
          <div className="row">
            <span>Password: </span> <input type="password" id="login-password" />
          </div>
          <button id="login-button" onClick={this.loginHandler.bind(this)}>Log In</button>
        </div>
        <div className="google">
          <GoogleSignIn onSuccess={this.googleSignInHandler.bind(this)}/>
        </div>
      </div>
    )
  }
}