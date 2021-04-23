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
      <GoogleLogout
        clientId={clientId}
        render={renderProps => (
          <button onClick={renderProps.onClick} disabled={renderProps.disabled} className="logout-button">Log Out</button>
        )}
        onLogoutSuccess={this.onLogout.bind(this)}
      />
    )
  }
}