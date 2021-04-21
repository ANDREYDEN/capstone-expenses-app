import React from "react"
import ReactDOM from "react-dom"
import "../styles/welcomeScreen.scss"
import { login, signup, oauth } from "../api/index.js"
import GoogleSignIn from "../components/googleSignIn.jsx"
import People from "../img/People.svg"

export default class WelcomeScreen extends React.Component {
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
        <img src={People} alt="Checkmark" />
        <h1>
          Expensify
        </h1>
        <h2>
          Share your expenses
        </h2>
        <button>
          Login
        </button>
        <h3>
          Dont have an account? Register
        </h3>
      </div>
    )
  }
}
