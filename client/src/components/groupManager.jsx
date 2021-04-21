import React from "react"
import ReactDOM from "react-dom"
import HomeHeader from "./homeHeader.jsx"
import GroupList from "./groupList.jsx"
import { Redirect } from "react-router-dom"
import { getGroupInviteLink } from "../api/index.js"

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
    }
  }

  render() {
    if (!this.props.match.params.id) {
      return <Redirect to={"/home"} />
    }
    const groups = this.globalState.get("groups") || []

    return (
      <main className="group-manager">
        <HomeHeader groupId={this.props.match.params.id} tab="groups"/>
        <div className="button-container">
          <button>
            Members
          </button>
          <button>
            Group Settings
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
