import React from "react"
import ReactDOM from "react-dom"
import "../styles/notifications.scss"

import { FaExclamation } from "react-icons/fa"

export default class NotificationsModule extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      message: "",
      title: "",
      isError: false,
      display: false
    }

    window.Notifications = {
      error: this.error.bind(this)
    }
  }

  error(title, message, timeout) {
    this.setState({title, message, isError: true, display: true })
    if (timeout) {
      setTimeout(() => this.setState({ display: false }), timeout)
    }
  }

  render() {
    const icon = this.state.isError ? (<span className="error-mark"><FaExclamation /></span>) : null
    return (
      <div className={`notification-banner ${this.state.display ? "active" : ""}`} onClick={() => this.setState({ display: false })}>
        <div className="disclaimer">
          <span className="bold">{this.state.title}</span>
          <span className="dimmed">{this.state.message}</span>
        </div>
        {icon}
      </div>
    )
  }
}