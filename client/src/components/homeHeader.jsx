import React from "react"
import ReactDOM from "react-dom"
import { Redirect } from "react-router-dom"
import AddGroup from "./addGroup.jsx"
import AddMember from "./addMember.jsx"
import "../styles/homeHeader.scss"
import { getGroups } from "../api/index.js"
import Avatar from  "./avatar.jsx"

export default class homeHeader extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      showGroupCreation: false,
      showAddMembers: false,
      selectedGroupId: props.groupId || null,
      redirect: null
    }
  }

  componentDidMount() {
    getGroups().then(res => {
      const stateUpdate = {}
      if (!this.state.selectedGroupId && res.data.groups[0]?._id) {
        stateUpdate.selectedGroupId = res.data.groups[0]?._id
      }
      stateUpdate.groups = res.data.groups
      this.globalState.set(stateUpdate)
    }).catch(console.log)
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />
    }
    const user = window.user()
    const groups = this.globalState.get("groups") || []
    const selectedGroupId = this.props.groupId
    const seletedGroup = groups.find(g => g._id === selectedGroupId)
    const initials = user.name.split(" ").map((name, index) => <span key={index}>{name[0].toUpperCase()}</span>)
    return (
      <div className="home-header">
        <div className="header">
          <button onClick={() => this.setState({ redirect: `/groups/${selectedGroupId}`})}>{seletedGroup?.name}</button>
          <Avatar user={user} />
        </div>
      </div>
    )
  }
}
