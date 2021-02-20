import React from 'react'
import ReactDOM from 'react-dom'
import { login, signup } from '../api/index.js'


export default class App extends React.Component {
  componentDidMount() {
    signup("tim", "1111").then(res => console.log(res)).catch(err => console.log(err))
  }

  render() {
    return (
      <header>
        "hello"
      </header>
    )
  }
}
