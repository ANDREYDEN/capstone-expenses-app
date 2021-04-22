import React from "react"
import ReactDOM from "react-dom"
import HomeHeader from "./homeHeader.jsx"
import GroupList from "./groupList.jsx"
import GroupMembers from "./groupMembers.jsx"
import { Redirect, Link } from "react-router-dom"
import { getGroupInviteLink, getGroups } from "../api/index.js"

export default class GroupManager extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      inviteLink: ""
    }
  }

  componentDidMount() {
    if (this.props.match.params.id) {
      getGroupInviteLink(this.props.match.params.id).then(res => {
        this.setState({ inviteLink: `http://localhost:8000/join/${res.data.token}` })
      }).catch(err => {
        console.log(err)
      })
      getGroups().then(res => {
        const stateUpdate = {}
        if (!this.state.selectedGroupId && res.data.groups[0]?._id) {
          stateUpdate.selectedGroupId = res.data.groups[0]?._id
        }
        stateUpdate.groups = res.data.groups
        this.globalState.set(stateUpdate)
      }).catch(console.log)
    }
  }

  render() {
    if (!this.props.match.params.id) {
      return <Redirect to={"/home"} />
    }
    const groups = this.globalState.get("groups") || []
    console.log(groups)
    if (this.props.match.params.view === "members") {
      return <GroupMembers group={groups.find(g => g._id === this.props.match.params.id)} />
    }
    return (
      <main className="group-manager">
        <HomeHeader groupId={this.props.match.params.id} tab="groups"/>
        <div className="button-container">
          <Link
            to={{pathname: "members"}}>
            PP Members
          </Link>
          <button>
            OO Group Settings
          </button>
        </div>
        <div className="groups">
          <div className="groups-header">
            <span>Groups</span>
            <button>+</button>
          </div>
          <GroupList groups={groups} currentGroupId={this.props.match.params.id} />
          <span>{this.state.inviteLink}</span>
        </div>
      </main>
    )
  }
}
