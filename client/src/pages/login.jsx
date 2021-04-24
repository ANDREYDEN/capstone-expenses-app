import React from "react"
import ReactDOM from "react-dom"
import "../styles/login.scss"
import { login, signup, oauth } from "../api/index.js"
import GoogleSignIn from "../components/googleSignIn.jsx"
import { FaArrowLeft } from "react-icons/fa" 
import { Link, Redirect } from "react-router-dom"

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
      <div className="login-container">
        <Link to={{
          pathname: `/welcomeScreen/`,
          state: {
          }
        }}>
        <h2>
          <FaArrowLeft/>
        </h2>
        </Link>
        <h1>
          Log In
        </h1>
        <h3>
          Account Details
        </h3>
        <div className="login">
          <div className = "username-password">
            <input type="email" id="login-email" placeholder="Email"/>
          </div>
        <div className = "username-password">
          <input type="password" id="login-password" placeholder="Password"/>
          </div>
        </div>
        <button className = "login-btn" id="login-button" onClick={this.loginHandler.bind(this)}>Log In</button>
        <h4>
          Or sign in with
        </h4>
        <div className="google">
          <GoogleSignIn onSuccess={this.googleSignInHandler.bind(this)}/>
        </div>
      </div>
    )
  }
}