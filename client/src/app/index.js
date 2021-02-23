import React from 'react'
import ReactDOM from 'react-dom'
import SignUpModule from '../pages/signup.jsx'
import MainPage from '../pages/main.jsx'


export default class App extends React.Component {
  componentDidMount() {
  }

  isAuthorized() {
    const parsed = document.cookie.split(";").reduce((memo, cookie) => {
      const [ name, value ] = cookie.split("=")
      memo[name] = value
      return memo
    }, {})
    return !!parsed["jwt"];
  }

  render() {
    if (!this.isAuthorized()) {
      return (
        <header>
          <SignUpModule />
        </header>
      )
    }
    return (
      <header>
        <MainPage />
      </header>
    )
  }
}
