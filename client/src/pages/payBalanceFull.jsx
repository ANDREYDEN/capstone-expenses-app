import React from "react"
import ReactDOM from "react-dom"
import { payExpenseSheets } from "../api/index.js"


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
        <div>
            <h3>User: {balance.name} </h3>
            <h3>Balance: {balance.userOwes.sum}</h3>
            <button onClick={this.payBalanceClick.bind(this)}>Pay Balance</button>
        </div>
      )
  }
}

