import React from "react"
import ReactDOM from "react-dom"

export default class ExpenseEntryCard extends React.Component {
  constructor(props) {
    super(props)
  }
  componentDidMount() {
    
  }
  render() {
    const { entry, userId: myId } = this.props
    const members = this.props.members.filter(m => m._id !== myId)
    const usersChecked = []
    const usersDismissed = []
    Object.keys(entry.userCheckedIds).forEach(userId => {
      if (userId !== myId) {
        if (entry.userCheckedIds[userId] === true) {
          usersChecked.push(userId)
        }
        if (entry.userCheckedIds[userId] === false) {
          usersDismissed.push(userId)
        }
      }
    })
    const usersNotChecked = members.map(m => m._id).filter(id => !(usersChecked.includes(id) || usersDismissed.includes(id)))
    const peoplePaid = (usersChecked.length || 0) + (entry.userCheckedIds[myId] ? 1 : 0)
    const pricePerUser = (peoplePaid > 0 ? (entry.price / peoplePaid) : 0).toFixed(2)
    const memberDots = [
      ...usersChecked.map(userId => <li
        key={userId}
        className="user-dot green" />
      ),
      ...usersDismissed.map(userId => <li
        key={userId}
        className="user-dot red" />
      ),
      ...usersNotChecked.map(userId => <li
        key={userId}
        className="user-dot grey" />
      )
    ]
    return (
      <div className="expense-entry-card">
        <div className={`my-dot ${entry.userCheckedIds[myId] === undefined ? "grey" : (entry.userCheckedIds[myId] && "green") || "red"}`}>
        </div>
        <div className="item-info">
          <div className="expense-entry-card-line">
            <div className="item-name">
              {entry.name}
            </div>
            <div className="price-per-user">
              <span className="dollars">${pricePerUser.split(".")[0]}</span><span className="cents">{pricePerUser.split(".")[1]}</span>
            </div>
          </div>
          <div className="expense-entry-card-line">
            <ul className="members">
              {memberDots}
            </ul>
            <div className="total-price">
              ${entry.price.toFixed(2)}
            </div>
          </div>
        </div>
      </div>
    )
  }
}
