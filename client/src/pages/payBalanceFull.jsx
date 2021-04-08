import React from "react"
import ReactDOM from "react-dom"
import { payExpenseSheets } from "../api/index.js"
import "../styles/payBalancesFull.scss" 
import { FaArrowLeft } from "react-icons/fa"
import { Link, Redirect } from "react-router-dom"

export default class PayBalanceFull extends React.Component {
  constructor(props) {
      super(props)
      this.groupId = props.match.params.id
  }
  componentDidMount() {
  }

  payBalanceClick() {
    const { balance } = this.props.location.state
    const { sheetsToPay } = balance.userOwes
    if (sheetsToPay?.length) {
        payExpenseSheets(sheetsToPay).then(console.log).catch(console.error)
    }
  }

  render() {
    const { balance } = this.props?.location?.state || {}
    if (!balance) {
      return <Redirect to={this.groupId ? `/balances/${this.groupId}` : "/home"} />
    }
    return (
      <div className= "pay-balances-full-container">
        <div className="pay-balance-names">
          <Link to={{
            pathname: `/payBalances/${this.groupId}`,
            state: {
              balance
            }
          }}>
            <h2>
              <FaArrowLeft/>
            </h2>
          </Link>
          <h3>Pay<span className="green"> ${balance.userOwes.sum}</span></h3>
          <h3>To<span className="green"> {balance.name}</span></h3>
        </div>
        <div className="pay-btn">
          <button className="pay-balance-btn" onClick={this.payBalanceClick.bind(this)}>Pay Balance</button>
        </div>
      </div>
    )
  }
}

