import React from "react"
import ReactDOM from "react-dom"
import { retrieveExpenseSheets, getGroupMembers } from "../api/index.js"
import { Link, Redirect } from "react-router-dom"
import "../styles/balance.scss"
import { FaArrowLeft } from "react-icons/fa"
import Avatar from "../components/avatar.jsx"

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

  // accepts sheets and members
  // returns an objcet { memeber, userOwes: accumulated amount of what user owes to that user
  calculateBalance(sheets, members) {
    const calculatedSheets = sheets.map(sheet => {
      // calculated total amount of what people owe to the creator
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
    const userId = window.userId()
    return members.map(member => {
      const userOwes = calculatedSheets.reduce((memo, sheet) => {
        if (sheet.createdBy === member._id) {
          if (! sheet.sheet.usersPaidIds?.[userId]) {
            memo.sum += sheet[userId] || 0
            if (sheet[userId] > 0) {
              memo.sheetsToPay.push(sheet.sheet._id)
            }
          }
        }
        return memo
      }, { sheetsToPay: [], sum: 0 })
      return {
        member: member,
        userOwes: userOwes
      }
    }).filter(memberBalance => memberBalance.member._id !== userId)
  }

  render() {
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
            <Avatar user={balance.member} />
            <span className="user-name">
              {balance.member.name}
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
              <h2>
                <FaArrowLeft/>
              </h2>
            </Link>
            <h3>Pay Balance</h3>
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
