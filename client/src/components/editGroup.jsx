import React from "react"
import ReactDOM from "react-dom"
import { Redirect, Link } from "react-router-dom"

import { updateGroup } from "../api/index.js"

import { FaArrowLeft } from "react-icons/fa"

import "../styles/groupManager.scss"

export default class EditGroup extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      showSaveButton: false
    }
    this.groupName = React.createRef()
  }

  componentDidMount() {
    
  }

  nameChange(e) {
    const newName = e.currentTarget.value.trim()
    this.setState({ showSaveButton: newName !== this.props.group.name })
  }
  saveGroup(e) {
    console.log(this.groupName.current.value)
    updateGroup(this.props.group._id, this.groupName.current.value.trim()).then(res => {
      this.setState({ showSaveButton: false })
      this.props.onGroupUpdate(res.data.group)
    }).catch(err => {
      console.error(err)
    })
  }

  render() {
    const group = this.props.group
    return (
      <main className="group-manager edit-group">
        <div className="header-section">
          <Link to={{pathname: `/groups/${group._id}`}} className="arrow"><FaArrowLeft /></Link>
          <h2 className="group-name">{group.name}</h2>
          <h4>Group Details</h4>
        </div>
        <label className="input-container" htmlFor="groupName">
          <span className="group-name">Store Name</span>
          <input ref={this.groupName} id="groupName" className="group-name-input" type="text" name="" defaultValue={group.name} onChange={this.nameChange.bind(this)}/>
        </label>
        <button className={`save-button ${this.state.showSaveButton ? "visible" : ""}`} onClick={this.saveGroup.bind(this)}>Save Changes</button>
      </main>
    )
  }
}
