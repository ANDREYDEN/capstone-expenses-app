import React from 'react'
import ReactDOM from 'react-dom'
import { login, signup } from '../api/index.js'


export default class App extends React.Component {
  componentDidMount() {
    login("tim", "1234").then(res => console.log(res)).catch(err => console.log(err))
  }

  render() {
    return (
      <header>
        
      </header>
    )
  }
}
