import React from "react"
import ReactDOM from "react-dom"
import { retrieveExpenseSheets, getGroupMembers } from "../api/index.js"
import { Link } from "react-router-dom"
import "../styles/payBalances.scss" 


export default class PayBalances extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }
    
    componentDidMount() {
    }

    render() {
      const { balance } = this.props.location.state
      return (
        <div className = "pay-balances-container">
          <h1>Pay Balance</h1>
          <h3>How much are you paying?</h3>
          <img src="https://s3.amazonaws.com/pixpa.com/com/articles/1525891879-76924-tanja-heffner-584866-unsplashjpg.png" alt="Logo" />
          <h3>{balance.name} </h3>
        <li className="user">
        <Link to={{
          pathname: '/payBalanceFull',
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
        </li>
        </div>
      )
  }
}

