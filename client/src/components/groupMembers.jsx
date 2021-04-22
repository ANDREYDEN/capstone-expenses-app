import React from "react"
import ReactDOM from "react-dom"
import { Redirect, Link } from "react-router-dom"
import { getGroupInviteLink } from "../api/index.js"

import Avatar from "../components/avatar.jsx"

import { FaArrowLeft, FaRegCopy } from "react-icons/fa"

export default class GroupManager extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    if (this.props.group) {
      getGroupInviteLink(this.props.group._id).then(res => {
        this.setState({ inviteLink: `http://localhost:8000/join/${res.data.token}` })
      }).catch(err => {
        console.log(err)
      })
    }
  }

  render() {
    const group = this.props.group
    if (!group) {
      return "hallo"
    }
    const members = (this.globalState.get("members") || []).map(m => {
      return (
        <li className="member-card" key={m._id}>
          <Avatar user={m} />
          <div className="user-info">
            <span className="name">{m.name}</span>
            <span className="email">{m.email}</span>
          </div>
        </li>
      )
    })
    return (
      <main className="group-manager members">
        <div className="header-section">
          <Link to={{pathname: `/groups/${group._id}`}} className="arrow"><FaArrowLeft /></Link>
          <h2 className="group-name">{group.name}</h2>
          <h4>Members</h4>
        </div>
        <div className="invite-block">
          <div className="instructions">
            <div className="disclaimer">
              <span className="bold">Invite Members</span>
              <span className="dimmed">Publish and share link with anyone</span>
            </div>
            <button className="copy-button">
              <FaRegCopy />
            </button>
          </div>
          <button className="share-button">Share Invite Link</button>
        </div>
        <ul className="member-list">
          {members}
        </ul>
      </main>
    )
  }
}
