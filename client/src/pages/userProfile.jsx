import React from "react"
import ReactDOM from "react-dom"
import { Redirect, Link } from "react-router-dom"

import PullToRefresh from "react-simple-pull-to-refresh"
import SpinnerPreload from "../components/spinner.jsx"

import GoogleSignOut from "../components/googleSignOut.jsx"

import Avatar from "../components/avatar.jsx"

import "../styles/userProfile.scss"

import { FaArrowLeft } from "react-icons/fa"

export default class UserProfile extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      redirect: null,
      error: null
    }
  }
  componentDidMount() {
    
  }

  goBack(e) {
    e.preventDefault()
    this.props.history.goBack(e)
  }

  render() {
    const user = window.user()
    if (!user) {
      return <Redirect to={{ pathname: "/welcomeScreen" }} />
    }

    const signedWithGoogle = document.cookie.split("; ").reduce((memo, cookie) => {
      const [name, value] = cookie.split("=")
      return memo || (name === "tokenId" && value)
    }, false)
    const googleLogout = <GoogleSignOut  key="google-logout" logout={window.logout}/>
    const logoutButton = signedWithGoogle ? googleLogout : <button onClick={() => window.logout("jwt")} className="logout-button">Log Out</button>
    return (
      <PullToRefresh onRefresh={() => new Promise(window.location.reload())} pullingContent="" refreshingContent={<SpinnerPreload />}>
        <main className="profile">
          <div className="header-section">
            <Link to={{pathname: `/home`}} className="arrow" onClick={this.goBack.bind(this)}><FaArrowLeft /></Link>
            {logoutButton}
          </div>
          <div className="user-info">
            <Avatar user={user} />
            <span className="user-name">{user.name}</span>
            <span className="user-email">{user.email}</span>
          </div>
        </main>
      </PullToRefresh>
    )
  }
}
