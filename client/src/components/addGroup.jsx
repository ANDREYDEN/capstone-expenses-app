import React from "react"
import ReactDOM from "react-dom"
import { createGroup } from "../api/index.js"

export default class AddGroup extends React.Component {
  constructor(props) {
    super(props)
    this.groupName = React.createRef()
  }
  createGroup() {
    const groupName = this.groupName.current.value
    createGroup(groupName).then(res => {
      this.props.onSuccess()
      console.log(res)
    }).catch(console.log)
  }
  render() {
    return (
      <div className="add-group">
        <input type="text" ref={this.groupName} />
        <button className="create-button" onClick={this.createGroup.bind(this)}>Create</button>
      </div>
    )
  }
}
