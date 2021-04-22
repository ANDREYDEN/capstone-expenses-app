import React from "react"
import ReactDOM from "react-dom"
import { Redirect, Link } from "react-router-dom"
import { getGroupMembers } from "../api/index.js"

export default class GroupManager extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
  }

  render() {
    const group = this.props.group
    console.log(group)
    return "hallo"

  }
}
