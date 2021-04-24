import React from "react"
import ReactDOM from "react-dom"
import HomeHeader from "../components/homeHeader.jsx"
import GroupList from "../components/groupList.jsx"
import GroupMembers from "../components/groupMembers.jsx"
import CreateGroup from "../components/createGroup.jsx"
import EditGroup from "../components/editGroup.jsx"
import Spinner from "../components/spinner.jsx"
import { Redirect, Link } from "react-router-dom"
import { getGroups, getGroupMembers } from "../api/index.js"
import { FiUsers, FiSettings } from "react-icons/fi"

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
      }).catch(console.error)

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
      return <GroupMembers group={group} showFinish={this.props.location?.state?.showFinish}/>
    }
    if (this.props.match.params.view === "edit") {
      return <EditGroup group={group} onGroupUpdate={(newGroup) => {
        const index = groups.findIndex(g => g._id === newGroup._id)
        groups[index] = newGroup
        this.globalState.set({ groups })
      }}/>
    }
    if (this.props.match.params.view === "new") {
      return <CreateGroup group={group} onGroupCreate={(newGroup) => {
        groups.push(newGroup)
        this.globalState.set({ groups })
        // this.setState({ finishLink: `groups/${newGroup._id}/members` })
      }}/>
    }
    return (
      <main className="group-manager groups">
        <HomeHeader groupId={this.props.match.params.id} tab="groups"/>
        <div className="button-container">
          <Link
            to={{pathname: `/groups/${this.props.match.params.id}/members`}}>
            <FiUsers /> Members
          </Link>
          {group.createdBy === window.userId() ? <Link
            to={{pathname: `/groups/${this.props.match.params.id}/edit`}}>
            <FiSettings /> Group Settings
          </Link> : null}
        </div>
        <div className="groups">
          <div className="groups-header">
            <span>Groups</span>
            <Link to={{pathname: `/groups/${this.props.match.params.id}/new`}}>+</Link>
          </div>
          <GroupList groups={groups} currentGroupId={this.props.match.params.id} />
          <span>{this.state.inviteLink}</span>
        </div>
      </main>
    )
  }
}
