import React from "react"
import ReactDOM from "react-dom"
import { addMember } from "../api/index.js"
import { FaClipboardCheck, FaClipboard } from "react-icons/fa"

export default class AddMember extends React.Component {
  constructor(props) {
    super(props)
    this.memberEmail = React.createRef()
    this.state = {
      coppied: false
    }
  }
  addMemeber() {
    const email = this.memberEmail.current.value
    addMember({ groupId: this.props.groupId, emails: [email] }).then(res => {
      console.log(res)
    }).catch(console.error)
  }
  copyGroupInvitaion(e) {
    e.preventDefault()
    navigator.clipboard.writeText(e.currentTarget.text)
    this.setState({ coppied: true })
  }
  render() {
    return (
      <div className="add-member">
        <input type="text" ref={this.memberEmail} />
        <button className="create-button" onClick={this.addMemeber.bind(this)}>Add</button>
        <a href="#" onClick={this.copyGroupInvitaion.bind(this)}>
          <span className="text">{`${window.origin}/join/${this.props.groupId}`}</span>
          <span className="clipboard">{this.state.coppied ? <FaClipboardCheck /> : <FaClipboard />}</span>
        </a>
      </div>
    )
  }
}
