import React from "react"
import ReactDOM from "react-dom"
import { retrieveExpenseSheets, getGroupMembers } from "../api/index.js"
import { Link } from "react-router-dom";


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
        <div>
          <h1>Pay Balance</h1>
          <h2>How much are you paying?</h2>
          <h3>User: {balance.name} </h3>
          <h3>Balance: {balance.userOwes.sum}</h3>
          <Link to={{
                        pathname: '/payBalanceFull',
                        state: {
                            balance
                        }
                    }}>Pay Full Balance</Link>
        </div>
      )
  }
}

