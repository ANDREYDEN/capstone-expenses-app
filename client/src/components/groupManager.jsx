import React from "react"
import ReactDOM from "react-dom"
import HomeHeader from "./homeHeader.jsx"
import GroupList from "./groupList.jsx"
import GroupMembers from "./groupMembers.jsx"
import EditGroup from "./editGroup.jsx"
import Spinner from "./spinner.jsx"
import { Redirect, Link } from "react-router-dom"
import { getGroups, getGroupMembers } from "../api/index.js"

import "../styles/groupManager.scss"

export default class GroupManager extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      inviteLink: ""
    }
  }

  componentDidMount() {
    if (this.props.match.params.id) {
      getGroups().then(res => {
        const stateUpdate = {}
        if (!this.state.selectedGroupId && res.data.groups[0]?._id) {
          stateUpdate.selectedGroupId = res.data.groups[0]?._id
        }
        stateUpdate.groups = res.data.groups
        this.globalState.set(stateUpdate)
      }).catch(console.log)

      getGroupMembers(this.props.match.params.id).then(res => {
        this.globalState.set({
          members: res.data.members
        })
      }).catch(console.error)
    }
  }

  render() {
    if (!this.props.match.params.id) {
      return <Redirect to={"/home"} />
    }
    const groups = this.globalState.get("groups") || []
    if (!groups.length) {
      return <Spinner />
    }
    const group = groups.find(g => g._id === this.props.match.params.id)
    if (this.props.match.params.view === "members") {
      return <GroupMembers group={group} />
    }
    if (this.props.match.params.view === "edit") {
      return <EditGroup group={group} onGroupUpdate={(newGroup) => {
        const index = groups.findIndex(g => g._id === newGroup._id)
        groups[index] = newGroup
        this.globalState.set({ groups })
      }}/>
    }
    return (
      <main className="group-manager groups">
        <HomeHeader groupId={this.props.match.params.id} tab="groups"/>
        <div className="button-container">
          <Link
            to={{pathname: `/groups/${this.props.match.params.id}/members`}}>
            PP Members
          </Link>
          <Link
            to={{pathname: `/groups/${this.props.match.params.id}/edit`}}>
            PP Group Settings
          </Link>
        </div>
        <div className="groups">
          <div className="groups-header">
            <span>Groups</span>
            <Link to={{pathname: `/new/groups/`}}>+</Link>
          </div>
          <GroupList groups={groups} currentGroupId={this.props.match.params.id} />
          <span>{this.state.inviteLink}</span>
        </div>
      </main>
    )
  }
}
