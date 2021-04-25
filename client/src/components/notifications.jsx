import React from "react"
import ReactDOM from "react-dom"
import "../styles/notifications.scss"

import { FaExclamation, FaCheck } from "react-icons/fa"

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
      error: this.error.bind(this),
      success: this.success.bind(this)
    }
  }

  error(title, message, timeout) {
    this.setState({title, message, isError: true, display: true })
    if (timeout) {
      setTimeout(() => this.setState({ display: false }), timeout)
    }
  }

  success(title, message, timeout) {
    this.setState({title, message, isError: false, display: true })
    if (timeout) {
      setTimeout(() => this.setState({ display: false }), timeout)
    }
  }

  render() {
    const icon = this.state.isError ? (<span className="error-mark"><FaExclamation /></span>) : (<span className="success-mark"><FaCheck /></span>)
    return (
      <div className={`notification-banner ${this.state.isError ? "error" : "success"} ${this.state.display ? "active" : ""}`} onClick={() => this.setState({ display: false })}>
        <div className="disclaimer">
          <span className="bold">{this.state.title}</span>
          <span className="dimmed">{this.state.message}</span>
        </div>
        {icon}
      </div>
    )
  }
}