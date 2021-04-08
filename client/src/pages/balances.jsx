import React from "react"
import ReactDOM from "react-dom"
import { retrieveExpenseSheets, getGroupMembers } from "../api/index.js"
import { Link, Redirect } from "react-router-dom"
import "../styles/balance.scss"
import { FaArrowLeft } from "react-icons/fa"

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
    retrieveExpenseSheets(this.groupId).then((res) => {
      this.setState({ sheets: res.data.expenseSheets })
    }).catch(err => console.error(err))
    getGroupMembers(this.groupId).then(res => {
      this.setState({
        members: res.data.members
      })
    }).catch(console.error)
  }

  calculateBalance(sheets, members) {
    const calculatedSheets = sheets.map(sheet => {
      const calculatedSheet = sheet.entries.reduce((memo, entry) => {
        // Filters those who have { userId: true }
        const usersPaid = Object.keys(entry.userCheckedIds).filter(userId => entry.userCheckedIds[userId])
        const pricePerUser = entry.price / usersPaid.length
        usersPaid.forEach(userId => {
          if (!memo[userId]) {
            memo[userId] = 0
          }
          memo[userId] += pricePerUser
        })
        return memo
      }, { sheet })
      calculatedSheet.createdBy = sheet.createdBy
      return calculatedSheet
    })
    const user = JSON.parse(window.localStorage.getItem("user"))
    return members.map(member => {
      const userOwes = calculatedSheets.reduce((memo, sheet) => {
        if (sheet.createdBy === member.email) {
          if (! sheet.sheet.usersPaidIds?.[user._id]) {
            memo.sum += sheet[user._id] || 0
            if (sheet[user._id] > 0) {
              memo.sheetsToPay.push(sheet.sheet._id)
            }
          }
        }
        return memo
      }, { sheetsToPay: [], sum: 0 })
      return {
        _id: member._id,
        name: member.name,
        userOwes: userOwes
      }
    }).filter(memberBalance => memberBalance._id !== user._id)
  }

  render() {
    const user = JSON.parse(localStorage.getItem("user"))
    const initials = user.name.split(" ").map((name, index) => <span key={index}>{name[0].toUpperCase()}</span>)
    if (!this.groupId) {
      return <Redirect to="/home" />
    }
    if (this.state.members.length) {
      if (this.state.sheets.length) {
        const balances =  this.calculateBalance(this.state.sheets, this.state.members).map((balance, index) =>
          <li className="user" key={index}>
            <Link to={{
              pathname: `/payBalances/${this.groupId}`,
              state: {
                balance
              }
            }}>
            <div className="avatar" style={{background: user.color}}>
              <span>
                {initials}
              </span>
            </div>
            <span className="user-name">
              {balance.name}
            </span>
            <span className="pull-right">
              ${balance.userOwes.sum}
            </span>
            </Link>
          </li>
        );
        return (
          <div className="balance-container">
            <Link to={{ pathname: '/home'}}>
              <h2><FaArrowLeft/>
              </h2>
            </Link>
            <h2>Pay Balance</h2>
            <h4>Who are your paying to?</h4>
            <ul className="users">
              {balances}
            </ul>
          </div>
        )
      }
      return (<div>no sheets</div>);
    }
    return (
      <span>
        Balances:
      </span>
    )
  }
}
