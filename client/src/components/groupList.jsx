import React from "react"
import ReactDOM from "react-dom"
import { Link } from "react-router-dom"

export default class GroupList extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
  }

  render() {
    const groups = this.props.groups.map(g => (
      <li key={g._id} className="group">
      {this.props.currentGroupId === g._id ?
        <span className="group-link">
          <span className="group-name">{g.name}</span>
          <span className="members">{g.userIds.length} members</span>
        </span>:
        <Link to={{pathname: `/home/${g._id}`}} className="group-link">
          <span className="group-name">{g.name}</span>
          <span className="members">{g.userIds.length} members</span>
        </Link>
      }
      </li>
    ))
    console.log(this.props.groups)
    return (
      <ul className="group-list">
        {groups}
      </ul>
    )
  }
}
