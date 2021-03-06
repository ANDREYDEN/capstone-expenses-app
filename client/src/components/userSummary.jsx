import React from "react"
import ReactDOM from "react-dom"

import "../styles/userSummary.scss"

import Spinner from "./spinner.jsx"

export default class UserSummary extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const sheets = this.globalState.get("sheets") || []
    const groups = this.globalState.get("groups") || []
    const selectedGroupId = this.globalState.get("selectedGroupId") || this.props.groupId
    const group = groups.find(group => group._id === selectedGroupId)

    if (!group) {
      return (
        <div className="user-summary">
          <Spinner />
        </div>
      )
    }

    const userId = window.userId()
    const summary = sheets.reduce((total, sheet) => {
      if (sheet.createdBy === userId) {
        const accumulateAmount = sheet.entries.reduce((memo, entry) => {
          const usersChecked = Object.keys(entry.userCheckedIds).filter(id => entry.userCheckedIds[id])
          const pricePerUser = entry.price / (usersChecked.length || 1)
          if (entry.userCheckedIds[userId]) {
            memo -= pricePerUser
          }
          // NOTE: if no-one has checked technically no-one owes you
          memo += pricePerUser * usersChecked.filter(uc => !sheet.usersPaidIds[uc]).length
          return memo
        }, 0)
        total.own += accumulateAmount + (parseFloat(sheet.tax) ? (accumulateAmount * parseFloat(sheet.tax) / 100) : 0)
        return total
      }

      const accumulateAmount = sheet.entries.reduce((memo, entry) => {
        const usersChecked = Object.keys(entry.userCheckedIds).filter(id => entry.userCheckedIds[id])
        const pricePerUser = entry.price / (usersChecked.length || 1)
        if (entry.userCheckedIds[userId]) {
          memo += sheet.usersPaidIds[userId] ? 0 : pricePerUser
        }
        return memo
      }, 0)

      total.owe += accumulateAmount + (parseFloat(sheet.tax) ? (accumulateAmount * parseFloat(sheet.tax) / 100) : 0)
      return total
    }, { owe: 0, own: 0 })

    // NOTE: we do not want them to be more than 16% appart
    // WHY 16 ? just the golden ration * 10 and add a percent sign
    const ownTranslate = ((summary.own / 100) > 1 ? 1 : (summary.own / 100)) * 16
    const oweTranslate = ((summary.owe / 100) > 1 ? 1 : (summary.owe / 100)) * 16
    return (
      <div className="user-summary">
        <div className="visualization">
          <div className="circle owe blured" style={{ transform: `translateX(-${50 - oweTranslate}%)`}}></div>
          <div className="circle owe" style={{ transform: `translateX(-${50 - oweTranslate}%)`}}></div>
          <div className="circle own blured" style={{ transform: `translateX(-${50 + ownTranslate}%)`}}></div>
          <div className="circle own" style={{ transform: `translateX(-${50 + ownTranslate}%)`}}></div>
          <div className="circle balance"></div>
        </div>
        <div className="summary">
          <div className="summary-section">
            <span className="sum">${summary.own.toFixed(0)}</span>
            <span className="title">I'm owed</span>
          </div>
          <div className="summary-section pull-right">
            <span className="sum">${summary.owe.toFixed(0)}</span>
            <span className="title">I owe</span>
          </div>
        </div>
      </div>
    )
  }
}
