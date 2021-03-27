import React from "react"
import ReactDOM from "react-dom"
import { retrieveExpenseSheets, getGroupMembers } from "../api/index.js"
import { Link } from "react-router-dom";



export default class Balances extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            sheets: [],
            members: []
        }
    }
    componentDidMount() {
        const groupId = "6036d85f7e0fff3b44e09391"
        retrieveExpenseSheets(groupId).then((res) => {
            this.setState({ sheets: res.data.expenseSheets })
          }).catch(err => console.error(err))
        getGroupMembers(groupId).then(res => {
            this.setState({
                members: res.data.members
            })
        }).catch(console.log)
    }

    calculateBalance(sheets, members) {
        console.log(sheets)
        const calculatedSheets = sheets.map(sheet => {
            const calculatedSheet = sheet.entries.reduce((memo, entry) => {
                // Filters those who have { userId: true }
                const usersPaid = Object.keys(entry.userCheckedIds).filter(userId => entry.userCheckedIds[userId])
                const pricePerUser = entry.price / usersPaid.length
                // memo.overall += entry.price
                usersPaid.forEach(userId => {
                if (!memo[userId]) {
                    memo[userId] = 0
                }
                memo[userId] += pricePerUser
                })
                return memo
            }, {})
            calculatedSheet.createdBy = sheet.createdBy
            return calculatedSheet
        })
        const user = JSON.parse(window.localStorage.getItem("user"))
        return members.map(member => {
            const userOwes = calculatedSheets.reduce((memo, sheet) => {
                if (sheet.createdBy === member.name) {
                    return memo + sheet[user._id] || 0
                }
                return memo
            }, 0)
            return {
                _id: member._id,
                name: member.name,
                sum: userOwes
            }
        }).filter(memberBalance => memberBalance._id !== user._id)
    }

    render() {
        if (this.state.members.length) {
            if (this.state.sheets.length) {
                const balances =  this.calculateBalance(this.state.sheets, this.state.members).map((balance, index) =>
                <li key={index}>
                    <Link to={{
                        pathname: '/payBalances',
                        state: {
                            balance
                        }
                    }}>{balance.name} - {balance.sum}</Link>
                </li>);
                return (<ul>{balances}</ul>)
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
