import React from "react"
import ReactDOM from "react-dom"
import "../styles/welcomeScreen.scss"
import { login, signup, oauth } from "../api/index.js"
import GoogleSignIn from "../components/googleSignIn.jsx"
import People from "../img/People.svg"
import { FaRegPlayCircle } from "react-icons/fa"
import { Link, Redirect } from "react-router-dom"

export default class WelcomeScreen extends React.Component {
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
        <Link to={{
            pathname: `/login/`,
            state: {
          }}}>
            <button className= "login-btn">
              Log In
            </button>
          </Link>
        <h3>
          Dont have an account?
          <Link to={{ pathname: `/register/` }} className="register-link">
            Register
          </Link>
        </h3>
      </div>
    )
  }
}
