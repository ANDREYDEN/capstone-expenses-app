import React from "react"
import ReactDOM from "react-dom"
import { Redirect, Link } from "react-router-dom"
import AddGroup from "./addGroup.jsx"
import "../styles/homeHeader.scss"
import { getGroups } from "../api/index.js"
import Avatar from  "./avatar.jsx"
import { FaChevronDown, FaChevronUp } from "react-icons/fa"

export default class homeHeader extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
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

  render() {
    const user = window.user()
    const groups = this.globalState.get("groups") || []
    const selectedGroupId = this.props.groupId
    const seletedGroup = groups.find(g => g._id === selectedGroupId)
    const arrow = this.props.tab === "groups" ? <FaChevronUp /> : <FaChevronDown />
    console.log(arrow)
    return (
      <div className="home-header">
        <div className="header">
          <Link to={{pathname: `/groups/${selectedGroupId}`}}>
            {seletedGroup?.name}
          </Link>
          <span className="arrow">
            {arrow}
          </span>
          <Avatar user={user} />
        </div>
      </div>
    )
  }
}
