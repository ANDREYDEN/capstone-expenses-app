import React from "react"
import ReactDOM from "react-dom"
import { GoogleLogin } from "react-google-login";


export default class GoogleSignIn extends React.Component {

  responseGoogle(response) {
    console.log(response);
  }

  render() {
    //TODO: store somewhere where it is accessible
    const clientId = "156305616884-kpnf7tl95noliu8243c4310fbp9h1v79.apps.googleusercontent.com"
    return (
      <div>
        <GoogleLogin
          clientId={clientId}
          buttonText="Login"
          onSuccess={this.responseGoogle}
          onFailure={this.responseGoogle}
          cookiePolicy={'single_host_origin'}
          isSignedIn={true}
        />
      </div>
    )
  }
}