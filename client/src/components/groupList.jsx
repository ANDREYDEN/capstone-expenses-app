import React from "react"
import ReactDOM from "react-dom"

export default class GroupList extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
  }

  render() {
    const groups = this.props.groups.map(g => <li key={g._id}> {g.name} </li>)
    console.log(this.props.groups)
    return (
      <ul className="group-list">
        {groups}
      </ul>
    )
  }
}
