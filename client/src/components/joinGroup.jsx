import React from "react"
import ReactDOM from "react-dom"
import { Redirect } from "react-router-dom"
import { joinGroup } from "../api/index.js"

export default class JoinGroup extends React.Component {
  constructor(props) {
    super(props)
    console.log(props)
    this.state = {
      redirect: null,
      error: null
    }
  }
  componentDidMount() {
    joinGroup(this.props.match.params.id).then(res => {
      const newUser = res.data.user
      window.setUser(newUser)
      this.setState({ redirect: `/home/${this.props.match.params.id}` })
    }).catch((err) => {
      this.setState({ error: err })
    })
  }
  render() {
    const redirect = this.state.redirect
    return (redirect ? <Redirect to={redirect} /> : <h2 className="error">{this.state.error?.name} {this.state.error?.message}</h2>)
  }
}
