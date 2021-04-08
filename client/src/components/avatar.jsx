import React from "react"
import ReactDOM from "react-dom"
import "../styles/avatar.scss"

export default class PayBalances extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const user = this.props.user
    if (!user) {
       return null
    }
    if (user.imageUrl) {
      return <img src={user.imageUrl} alt={user.name} className="avatar" />
    }
    const initials = user.name.split(" ").map((name, index) => <span key={index}>{name[0].toUpperCase()}</span>)
    return (
      <div className="avatar" style={{background: user.color}}>
        {initials}
      </div>
    )
  }
}