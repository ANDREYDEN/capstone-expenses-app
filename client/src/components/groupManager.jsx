import React from "react"
import ReactDOM from "react-dom"
import AddGroup from "./addGroup.jsx"
import AddMember from "./addMember.jsx"
import GroupDropDown from "./groupDropDown.jsx"
import "../styles/groupManager.scss"

import { getGroups } from "../api/index.js"

export default class GroupManager extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      showGroupCreation: false,
      showAddMembers: false,
      selectedGroupId: props.groupId || null
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

  showGroupCreation() {
    this.setState({
      showGroupCreation: true
    })
  }
  hideGroupCreation() {
    this.setState({
      showGroupCreation: false
    })
  }
  showAddMembers() {
    this.setState({
      showAddMembers: true
    })
  }
  hideAddMembers() {
    this.setState({
      showAddMembers: false
    })
  }
  render() {
    const groups = this.globalState.get("groups") || []
    const selectedGroupId = this.props.groupId || this.globalState.get("selectedGroupId")
    const groupDropDown = groups.length ? <GroupDropDown onGroupChange={this.props.onGroupChange} groups={groups} selectedGroupId={selectedGroupId}/> : null
    const addGroup = this.state.showGroupCreation ? <AddGroup onSuccess={this.hideGroupCreation.bind(this)} /> : null
    const addMembers = this.state.showAddMembers ? <AddMember groupId={selectedGroupId} onSuccess={this.hideAddMembers.bind(this)} /> : null
    const groupDict = (groups || []).reduce((memo, group) => {
      memo[group._id] = group
      return memo
    }, {})
    return (
      <div className="group-manager">
        <div className="group-creation">
          // NOTE: this is temporary. To be changed
          <button onClick={this.showGroupCreation.bind(this)}>New Group</button>
          {addGroup}
          // NOTE: this is temporary. To be changed
          <button onClick={this.showAddMembers.bind(this)}>Add Member</button>
          {addMembers}
        </div>
        <div className="header">
          {groupDropDown}
          <img src="https://s3.amazonaws.com/pixpa.com/com/articles/1525891879-76924-tanja-heffner-584866-unsplashjpg.png" alt="avantar" />
        </div>
      </div>
    )
  }
}
