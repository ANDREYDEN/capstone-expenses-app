import React from "react"
import ReactDOM from "react-dom"
import "../styles/register.scss"
import { login, signup, oauth } from "../api/index.js"
import GoogleSignIn from "../components/googleSignIn.jsx"
import { FaArrowLeft } from "react-icons/fa"
import { Link, Redirect } from "react-router-dom"

export default class RegisterModule extends React.Component {
  signUpHandler() {
    const name = document.getElementById("signup-name").value
    const password = document.getElementById("signup-password").value
    const email = document.getElementById("signup-email").value
    // TODO: some email password and name validation
    signup(email, name, password).then(res => {
      window.setUser(res.data.user)
      this.props.loginCallback()
    }).catch(err => {
      console.error(err)
      window.Notifications.error("Error", "Failed to create account. Try different name!", 8000)
    })
  }

  render() {
    return (
      <div className="register-container">
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
          Register
        </h1>
        <h3>
          Account Details
        </h3>
        <div className="login">
          <div className = "username-password">
            <input type="text" id="signup-name" placeholder="Name"/>
          </div>
          <div className = "username-password">
            <input type="email" id="signup-email" placeholder="Email"/>
          </div>
          <div className = "username-password">
            <input type="password" id="signup-password" placeholder="Password"/>
          </div>
        </div>
        <button className = "register-btn" id="signup-button" onClick={this.signUpHandler.bind(this)}>
          Sign Up
        </button>
       </div>
    )
  }
}
