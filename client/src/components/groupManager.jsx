import React from "react"
import ReactDOM from "react-dom"
import AddGroup from "./addGroup.jsx"
import GroupDropDown from "./groupDropDown.jsx"

import { getGroups } from "../api/index.js"

export default class GroupManager extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      showGroupCreation: false
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
  render() {
    const groups = this.globalState.get("groups") || []
    const groupDropDown = groups.length ? <GroupDropDown onGroupChange={this.props.onGroupChange} groups={groups}/> : null
    const addGroup = this.state.showGroupCreation ? <AddGroup onSuccess={this.hideGroupCreation.bind(this)} /> : null
    const groupDict = (groups || []).reduce((memo, group) => {
      memo[group._id] = group
      return memo
    }, {})
    return (
      <div className="group-section">
        <span className="current-group">Current group name: {groupDict[this.globalState.get("selectedGroupId")]?.name || ""}</span>
        <button onClick={this.showGroupCreation.bind(this)}>New Group</button>
        {addGroup}
        {groupDropDown}
      </div>
    )
  }
}
