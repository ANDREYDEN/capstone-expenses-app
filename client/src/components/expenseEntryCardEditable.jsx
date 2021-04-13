import React from "react"
import ReactDOM from "react-dom"

export default class ExpenseEntryCardEditable extends React.Component {
  constructor(props) {
    super(props)

    this.itemName = React.createRef()
  }
  componentDidMount() {
    
  }

  render() {
    const { entry, userId: myId } = this.props

    if (entry) {
      // TODO: edit existing one
    }
    else {
      // TODO: adding a new one
    }

    return (
      <div className="overlay">
        <div className="expense-entry-card">
          <div className="item-info">
            <div className="expense-entry-card-line">
              <span className="item-name-container">
                <input className="item-name" placeholder="Item Name"/>
              </span>
              <span className="item-price-container">
                $<input type="text" className="item-price" placeholder="0.00"/>
              </span>
            </div>
          </div>
        </div>
      </div>
    )
  }
}