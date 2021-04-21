import React from "react"
import ReactDOM from "react-dom"
import { Redirect, Link } from "react-router-dom"

import "../styles/homeFooter.scss"

export default class HomeFooter extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      redirect: null
    }
  }

  componentDidMount() {
  }

  buttonClick() {

  }

  render() {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />
    }
    return (
      <footer className="home-footer">
        {this.props.active === "home" ? <span className="active"> O Home </span> : <Link to={{ pathname: `/home/${this.props.groupId}` }}>
          <span>O Home</span>
        </Link>}
        {this.props.active === "expenses" ? <span className="active"> O Expenses </span> : <Link to={{ pathname: `/expenses/${this.props.groupId}` }}>
          <span>O Expenses</span>
        </Link>}
      </footer>
    )
  }
}
