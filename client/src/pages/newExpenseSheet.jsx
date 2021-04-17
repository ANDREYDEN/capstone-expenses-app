import React from "react"
import ReactDOM from "react-dom"
import { newExpenseSheet } from "../api/index.js"
import { Link, Redirect } from "react-router-dom"
import { FaArrowLeft } from "react-icons/fa"
import "../styles/newExpenseSheet.scss"


export default class Balances extends React.Component {
  constructor(props) {
    super(props)
    this.groupId = props.match.params.id
    this.state = {
      sheets: [],
      members: []
    }
  }

  componentDidMount() {
  }

  render() {
    return(
      <div className="new-expense-container">
        <Link to={{ pathname: '/home'}}>
          <h2>
            <FaArrowLeft/>
          </h2>
        </Link>
        <h1>
          New Expense
        </h1>
        <h3>
          Purchase Details
        </h3>
        <div className="store-details">
        <label className="store-info">Store Name</label>
        <input className="store-info" type="text" name=""/>
        <br/>
        <label className="store-info">Purchase Date</label>
        <input className="store-info" type="text" name=""/>
        <br/>
        <label className="store-info">Tax (Optional)</label>
        <input className="store-info" type="text" name=""/>
        <br/>
        </div>
        <div className="create-btn">
          <button className="create-expense-btn">Create Expense</button>
        </div>
      </div>
    )
  }
}
