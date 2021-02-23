import React from 'react'
import ReactDOM from 'react-dom'
import SignUpModule from '../pages/signup.jsx'


export default class App extends React.Component {
  componentDidMount() {
  }

  render() {
    return (
      <header>
        <SignUpModule />
      </header>
    )
  }
}
