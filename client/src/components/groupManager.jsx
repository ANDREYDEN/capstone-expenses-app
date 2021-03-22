import React from "react"
import ReactDOM from "react-dom"
import AddGroup from "./addGroup.jsx"
import GroupDropDown from "./groupDropDown.jsx"

import { getGroups } from "../api/index.js"

export default class GroupManager extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      showGroupCreation: false,
      groups: []
    }

    getGroups().then(res => {
      this.setState({ groups: res.data.groups })
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

  switchGroupTo(groupId) {
    console.log(groupId)
  }
  render() {
    const groupDropDown = this.state.groups.length ? <GroupDropDown onGroupChange={this.switchGroupTo.bind(this)} groups={this.state.groups}/> : null
    const addGroup = this.state.showGroupCreation ? <AddGroup onSuccess={this.hideGroupCreation.bind(this)} /> : null
    return (
      <div className="group-section">
        <button onClick={this.showGroupCreation.bind(this)}>New Group</button>
        {addGroup}
        {groupDropDown}
      </div>
    )
  }
}
