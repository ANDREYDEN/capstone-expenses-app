import React from "react"
import ReactDOM from "react-dom"
import { retrieveExpenseSheets, getGroupMembers } from "../api/index.js"
import { Link, Redirect } from "react-router-dom"
import "../styles/payBalances.scss"
import { FaArrowLeft } from "react-icons/fa"
import Avatar from "../components/avatar.jsx"

export default class PayBalances extends React.Component {
  constructor(props) {
    super(props)
    this.groupId = props.match.params.id
  }

  componentDidMount() {
  }

  render() {
    const { balance } = this.props?.location?.state || {}
    if (!balance) {
      return <Redirect to={this.groupId ? `/balances/${this.groupId}` : "/home"} />
    }
    return (
      <div className = "pay-balances-container">
        <Link to={{ pathname: `/balances/${this.groupId}`}}>
          <h2>
            <FaArrowLeft/>
          </h2>
        </Link>
        <h2>Pay Balance</h2>
        <h4>How much are you paying?</h4>
        <div className="image-and-name">
          <div className="image">
            <Avatar user={balance.member} />
          </div>
          <h4>{balance.member.name}</h4>
        </div>
        <div className="user">
          <Link to={{
            pathname: `/payBalanceFull/${this.groupId}`,
            state: {
              balance
          }}}>
            <span className = "user-name">
              Pay Full Balance
            </span>
            <span className = "pull-right">
              ${balance.userOwes.sum}
            </span>
          </Link>
        </div>
      </div>
    )
  }
}

