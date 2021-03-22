import React from "react"
import ReactDOM from "react-dom"
import AddGroup from "./addGroup.jsx"

export default class GroupManager extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      showGroupCreation: false
    }
  }
  showGroupCreation() {
    this.setState({
      showGroupCreation: true
    })
  }
  hideGroupCreatio(e) {
    this.setState({
      showGroupCreation: false
    })
  }
  render() {

    const addGroup = this.state.showGroupCreation ? <AddGroup onSuccess={this.hideGroupCreatio.bind(this)} /> : null
    return (
      <div className="group-section">
        <button onClick={this.showGroupCreation.bind(this)}>New Group</button>
        {addGroup}
      </div>
    )
  }
}
