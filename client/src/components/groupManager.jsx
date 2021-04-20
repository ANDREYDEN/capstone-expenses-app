import React from "react"
import ReactDOM from "react-dom"
import HomeHeader from "./homeHeader.jsx"
import GroupList from "./groupList.jsx"
import { Redirect } from "react-router-dom"

export default class GroupManager extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
  }

  render() {
    if (!this.props.match.params.id) {
      return <Redirect to={"/home"} />
    }
    const groups = this.globalState.get("groups") || []

    return (
      <main>
        <HomeHeader groupId={this.props.match.params.id} />
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
        </div>
      </main>
    )
  }
}
