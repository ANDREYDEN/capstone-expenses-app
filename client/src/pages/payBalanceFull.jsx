import React from "react"
import ReactDOM from "react-dom"
import { payExpenseSheets } from "../api/index.js"
import "../styles/payBalancesFull.scss" 
import { FaArrowLeft } from "react-icons/fa"
import { Link, Redirect } from "react-router-dom"
import Checkmark from "../img/Checkmark.svg"

export default class PayBalanceFull extends React.Component {
  constructor(props) {
      super(props)
      this.groupId = props.match.params.id
      this.state = {
        total: props.location?.state?.balance?.userOwes?.sum || 0,
        redirect: false
      }
  }
  componentDidMount() {
  }

  payBalanceClick() {
    const { balance } = this.props.location.state
    const { sheetsToPay } = balance.userOwes
    if (sheetsToPay?.length) {
      payExpenseSheets(sheetsToPay).then(()=> {
        this.setState({ total: 0 })
        setTimeout(() => {
          this.setState({ redirect: true })
        }, 1000)
      }).catch(console.error)
    }
  }

  render() {
    const { balance } = this.props?.location?.state || {}
    if (!balance || this.state.redirect) {
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
          <h3>{this.state.total === 0 ? "Paid" : "Pay"}<span className="green"> ${this.state.total}</span></h3>
          <h3>To<span className="green"> {balance.member.name}</span></h3>
        </div>
        {this.state.total === 0 ? (
          <img src={Checkmark} alt="Checkmark" />
        ) : (
          <div className="pay-btn">
            <button className="pay-balance-btn" onClick={this.payBalanceClick.bind(this)}>Pay Balance</button>
          </div>
        )}
      </div>
    )
  }
}
