import React from "react"
import ReactDOM from "react-dom"
import { Redirect, Link } from "react-router-dom"

import "../styles/homeFooter.scss"

export default class SVGIcon extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      svg: null
    }
  }

  componentDidMount() {
    fetch(this.props.src).then(response => {
      response.text().then(html => {
        this.setState({ svg: html })
      })
    })
  }

  render() {
    return this.state.svg ? <span className="svg-icon" dangerouslySetInnerHTML={{ __html: this.state.svg }}></span> : this.props.alt || null
  }
}
