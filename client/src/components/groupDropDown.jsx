import React from "react"
import ReactDOM from "react-dom"
import AddGroup from "./addGroup.jsx"
import { FaChevronDown } from "react-icons/fa"

export default class GroupDropDown extends React.Component {
  constructor(props) {
    super(props)
  }

  onGroupChange(e) {
    const groupId = e.target.value
    // FUCK redirect and router it does not work here
    window.location.pathname = `/home/${groupId}`
  }

  render() {
    const groups = this.props.groups || []
    const options = groups.map((group, index) => <option key={index} value={group._id}>{group.name}</option>)
    return (
      <div className="group-dropdown">
        <select id="groupDropDown" defaultValue={this.props.selectedGroupId} onChange={this.onGroupChange.bind(this)}>
          {options}
        </select>
        <span className="arrow-down">
          <FaChevronDown />
        </span>
      </div>
    )
  }
}
