import React from "react"
import ReactDOM from "react-dom"
import { retrieveExpenseSheets, getGroupMembers } from "../api/index.js"


export default class PayBalanceFull extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            sheets: [],
            members: []
        }
    }
    componentDidMount() {
        const groupId = "6036d85f7e0fff3b44e09391"
        retrieveExpenseSheets(groupId).then((res) => {
            this.setState({ sheets: res.data.expenseSheets })
          }).catch(err => console.error(err))
        getGroupMembers(groupId).then(res => {
            this.setState({
                members: res.data.members
            })
        }).catch(console.log)
    }

    render() {
        const { balance } = this.props.location.state
      return (
        <div>
            <h3>User: {balance.name} </h3>
            <h3>Balance: {balance.sum}</h3>
            <button>Pay Balance</button>
        </div>
      )
  }
}

