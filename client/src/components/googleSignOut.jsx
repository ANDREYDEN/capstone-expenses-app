import React from "react"
import ReactDOM from "react-dom"
import { GoogleLogout } from "react-google-login";


export default class GoogleSignOut extends React.Component {
  onLogout() {
    this.props.logout("tokenId")
  }

  render() {
    //TODO: store somewhere where it is accessible
    const clientId = "156305616884-kpnf7tl95noliu8243c4310fbp9h1v79.apps.googleusercontent.com"
    return (
      <div>
        <GoogleLogout
          clientId={clientId}
          buttonText="Logout"
          onLogoutSuccess={this.onLogout.bind(this)}
        />
      </div>
    )
  }
}