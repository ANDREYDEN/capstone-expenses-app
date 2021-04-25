import React from "react"
import ReactDOM from "react-dom"

import { ReactComponent as DeleteIcon } from "../img/delete.svg"
import { ReactComponent as DuplicateIcon } from "../img/duplicate.svg"

export default class ExpenseEntryCardEditable extends React.Component {
  constructor(props) {
    super(props)

    this.itemName = React.createRef()
    this.itemPrice= React.createRef()

    this.state = {
      name: "",
      price: ""
    }

    this.currentEntry = null
  }
  componentDidUpdate() {
    if (!this.props.entry && this.currentEntry !== null) {
      this.currentEntry = null
      this.setState({ name: "", price: "" })
    }
    else if (this.props.entry && this.props.entry !== this.currentEntry) {
      this.currentEntry = this.props.entry
      this.setState({ name: this.props.entry.name, price: this.props.entry.price })
    }
  }

  nameUpdate(e) {
    this.setState({ name: e.currentTarget.value })
  }
  priceUpdate(e) {
    this.setState({ price: e.currentTarget.value })
  }

  doneEditing(e) {
    if (e.target !== e.currentTarget) {
      return
    }
    const newName = this.itemName.current.value
    const newPrice = this.itemPrice.current.value

    this.props.onSave({
      id: this.props.entry?.id,
      name: newName,
      price: parseFloat(newPrice || 0)
    })
  }

  render() {
    const { entry, addEntry } = this.props
    return (
      <div className={`overlay ${entry || addEntry ? "active" : ""}`} onClick={this.doneEditing.bind(this)}>
        <div className="expense-entry-card">
          <div className="item-info">
            <div className="expense-entry-card-line">
              <span className="item-name-container">
                <input className="item-name" placeholder="Item Name" ref={this.itemName} value={this.state.name} onChange={this.nameUpdate.bind(this)}/>
              </span>
              <span className="item-price-container">
                $<input type="text" className="item-price" placeholder="0.00" type="number" step="any" ref={this.itemPrice} value={this.state.price} onChange={this.priceUpdate.bind(this)}/>
              </span>
            </div>
          </div>
        </div>
        {entry && !addEntry ? (
          <div className="delete-duplicate-controlls">
            <button className="delete" onClick={this.props.onDelete}><span className="text-wrapper"><DeleteIcon /> Delete </span></button>
            <div className="bar"></div>
            <button className="duplicate" onClick={this.props.onDuplicate}><span className="text-wrapper"><DuplicateIcon /> Duplicate </span></button>
          </div>
        ): null}
      </div>
    )
  }
}