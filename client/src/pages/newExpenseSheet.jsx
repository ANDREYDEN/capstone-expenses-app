import React from "react"
import ReactDOM from "react-dom"
import { createNewExpenseSheet } from "../api/index.js"
import { Link, Redirect } from "react-router-dom"
import { FaArrowLeft } from "react-icons/fa"
import "../styles/newExpenseSheet.scss"


export default class Balances extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      redirect: null
    }
    this.groupId = props.match.params.id
    this.name = React.createRef()
    this.store = React.createRef()
    this.date = React.createRef()
    this.tax = React.createRef()
  }

  componentDidMount() {
  }

  createButtonClick(e) {
    const store = this.store.current.value
    const date = this.date.current.value
    const tax = this.tax.current.value
    
    if (!(store && date)) {
      console.error("need store and date")
      return
    }

    createNewExpenseSheet(this.groupId, { store, date, tax }).then(res => {
      this.setState({ redirect: `/sheets/${res.data.newSheet._id}` })
    }).catch(console.error)    
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />
    }
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
        <h2>
          Purchase Details
        </h2>
        <label className="input-container" htmlFor="storeName">
          <span className="store-info">Store Name</span>
          <input ref={this.store} id="storeName" className="store-input" type="text" name=""/>
        </label>
        <label className="input-container" htmlFor="purchaseDate">
          <span className="store-info">Purchase Date</span>
          <input ref={this.date}  id="purchaseDate" className="store-input" type="date" name=""/>
        </label>
        <label className="input-container" htmlFor="tax">
          <span className="store-info">Tax (Optional) %</span>
          <input ref={this.tax}  id="tax" className="store-input" type="number" max="100" min="1" name="" defaultValue="0"/>
        </label>
        <button className="create-expense-btn" onClick={this.createButtonClick.bind(this)}>Create Expense</button>
      </div>
    )
  }
}
