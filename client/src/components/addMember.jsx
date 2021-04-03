import React from "react"
import ReactDOM from "react-dom"
import { addMember } from "../api/index.js"

export default class AddMember extends React.Component {
  constructor(props) {
    super(props)
    this.memberEmail = React.createRef()
  }
  addMemeber() {
    const email = this.memberEmail.current.value
    console.log(email, this.props.groupId)
    // addMember({ groupId: this.props.groupId, emails: [email] }).then(res => {
    //   console.log(res)
    // }).catch(console.error)
    // const groupName = this.groupName.current.value
    // createGroup(groupName).then(res => {
    //   this.props.onSuccess()
    //   const groups = this.globalState.get("groups")
    //   groups.push(res.data.group)
    //   if (groups.length === 1) {
    //     this.globalState.get("selectedGroupId")
    //   }
    //   this.globalState.set({ groups })
    // }).catch(console.log)
  }
  render() {
    return (
      <div className="add-member">
        <input type="text" ref={this.memberEmail} />
        <button className="create-button" onClick={this.addMemeber.bind(this)}>Add</button>
      </div>
    )
  }
}
