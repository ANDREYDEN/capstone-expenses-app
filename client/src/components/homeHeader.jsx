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
  }

  componentDidMount() {
  }

  render() {
    const user = window.user()
    const groups = this.globalState.get("groups") || []
    const selectedGroupId = this.props.groupId
    const seletedGroup = groups.find(g => g._id === selectedGroupId)
    const arrow = this.props.tab === "groups" ? <FaChevronUp /> : <FaChevronDown />
    const link = this.props.tab === "groups" ? `/home/${selectedGroupId}` : `/groups/${selectedGroupId}`
    return (
      <div className="home-header">
        <div className="header">
          <Link to={{pathname: link}}>
            {seletedGroup?.name}
          </Link>
          <span className="arrow">
            {arrow}
          </span>
          <Link className="avatar-link" to={{ pathname: "/profile" }}>
            <Avatar user={user} />
          </Link>
        </div>
      </div>
    )
  }
}
