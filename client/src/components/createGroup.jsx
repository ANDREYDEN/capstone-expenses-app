import React from "react"
import ReactDOM from "react-dom"
import { Redirect, Link } from "react-router-dom"

import { createGroup } from "../api/index.js"

import { FaArrowLeft } from "react-icons/fa"

import "../styles/groupManager.scss"

export default class EditGroup extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      showSaveButton: false,
      redirect: null
    }
    this.groupName = React.createRef()
  }

  componentDidMount() {
    this.groupName.current.focus()
  }

  nameChange(e) {
    const newName = e.currentTarget.value.trim()
    this.setState({ showSaveButton: !!newName })
  }
  saveGroup(e) {
    const groupName = this.groupName.current.value.trim()
    if (!groupName) {
      console.error("Group needs a name")
      return
    }
    createGroup(groupName).then(res => {
      this.props.onGroupCreate(res.data.group)
      // NOTE: we need to update global state for members because that's where GroupMemebers gets data
      const user = window.user()
      this.globalState.set({ members: [user] })
      this.setState({
        redirect: `/groups/${res.data.group._id}/members`
      })
    }).catch(err => {
      console.error(err)
    })
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to={{
        pathname: this.state.redirect,
        state: { showFinish: true }
      }}/>
    }
    const group = this.props.group
    return (
      <main className="group-manager edit-group">
        <div className="header-section">
          <Link to={{pathname: `/groups/${group._id}`}} className="arrow"><FaArrowLeft /></Link>
          <h2 className="group-name">New Group</h2>
          <h4>Group Details</h4>
        </div>
        <label className="input-container" htmlFor="groupName">
          <span className="group-name">Group Name</span>
          <input ref={this.groupName} id="groupName" className="group-name-input" type="text" name="" defaultValue="" onChange={this.nameChange.bind(this)}/>
        </label>
        <button className={`save-button ${this.state.showSaveButton ? "visible" : ""}`} onClick={this.saveGroup.bind(this)}>Create Group</button>
      </main>
    )
  }
}
