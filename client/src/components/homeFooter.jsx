import React from "react"
import ReactDOM from "react-dom"
import { Redirect, Link } from "react-router-dom"

import HomeIcon from "../img/home.svg"
import ReceiptIcon from "../img/receipt.svg"

import SVGIcon from "./svgIcon.jsx"

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
        {this.props.active === "home" ? <span className="active"><span className="text-wrapper"><SVGIcon src={HomeIcon} alt="Home icon" /> Home </span></span> : <Link to={{ pathname: `/home/${this.props.groupId}` }}>
          <span><span className="text-wrapper"><SVGIcon src={HomeIcon} alt="Home icon" /> Home </span></span>
        </Link>}
        {this.props.active === "expenses" ? <span className="active"><span className="text-wrapper"><SVGIcon src={ReceiptIcon} alt="Expenses icon" /> Expenses </span></span> : <Link to={{ pathname: `/expenses/${this.props.groupId}` }}>
          <span><span className="text-wrapper"><SVGIcon src={ReceiptIcon} alt="Expenses icon" /> Expenses </span></span>
        </Link>}
      </footer>
    )
  }
}
