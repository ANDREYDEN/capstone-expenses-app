import React from 'react'
import ReactDOM from 'react-dom'
import { login, signup } from '../api/index.js'


export default class SignUpModule extends React.Component {
  signUpHandler() {
    const name = document.getElementById("signup-name").value
    const password = document.getElementById("signup-password").value
    signup(name, password).then(res => console.log(res)).catch(err => console.log(err))
  }

  loginHandler() {
    const name = document.getElementById("login-name").value
    const password = document.getElementById("login-password").value
    login(name, password).then(res => {
      this.props.loginCallback()
    }).catch(err => {
      console.log(err)
    })
  }

  render() {
    return (
      <div className="container">
        <div className="signup">
          <span>Name: </span> <input type="text" id="signup-name" />
          <span>Password: </span> <input type="password" id="signup-password" />
          <button id="signup-button" onClick={this.signUpHandler}>Sign Up</button>
        </div>
        <div className="login">
          <span>Name: </span> <input type="text" id="login-name" />
          <span>Password: </span> <input type="password" id="login-password" />
          <button id="login-button" onClick={this.loginHandler.bind(this)}>Log In</button>
        </div>
      </div>
    )
  }
}
