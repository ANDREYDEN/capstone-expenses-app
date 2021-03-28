import React from "react"
import ReactDOM from "react-dom"
import { payExpenseSheets } from "../api/index.js"
import "../styles/payBalancesFull.scss" 


export default class PayBalanceFull extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
        }
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
        const { balance } = this.props.location.state
      return (
        <div className= "pay-balances-full-container">
            <h3>Pay <span className="green">${balance.userOwes.sum}</span></h3>
                
            <h3>To <span className="green">{balance.name}</span></h3>
            
            <button className="pay-balance-btn" onClick={this.payBalanceClick.bind(this)}>Pay Balance</button>
        </div>
      )
  }
}

