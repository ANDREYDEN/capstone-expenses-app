import React from "react"
import ReactDOM from "react-dom"
import AddGroup from "./addGroup.jsx"

export default class GroupDropDown extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      showGroupCreation: false
    }
  }

  render() {
    const groups = this.props.groups || []
    const options = groups.map((group, index) => <option key={index} value={group._id}>{group.name}</option>)
    return (
      <select className="group-dropdown">
        {options}
      </select>
    )
  }
}
