import React from "react"
import ReactDOM from "react-dom"

import DeleteIcon from "../img/delete.svg"
import DuplicateIcon from "../img/duplicate.svg"

import SVGIcon from "./svgIcon.jsx"

export default class ExpenseEntryCardEditable extends React.Component {
  constructor(props) {
    super(props)

    this.itemName = React.createRef()
    this.itemPrice= React.createRef()
  }
  componentDidMount() {
    
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
                <input className="item-name" placeholder="Item Name" ref={this.itemName} defaultValue={entry?.name || ""}/>
              </span>
              <span className="item-price-container">
                $<input type="text" className="item-price" placeholder="0.00" type="number" step="any" ref={this.itemPrice} defaultValue={entry?.price?.toFixed(2) || ""}/>
              </span>
            </div>
          </div>
        </div>
        {entry && !addEntry ? (
          <div className="delete-duplicate-controlls">
            <button className="delete" onClick={this.props.onDelete}><span className="text-wrapper"><SVGIcon src={DeleteIcon} alt="Checkmark" /> Delete </span></button>
            <div className="bar"></div>
            <button className="duplicate" onClick={this.props.onDuplicate}><span className="text-wrapper"><SVGIcon src={DuplicateIcon} alt="Checkmark" /> Duplicate </span></button>
          </div>
        ): null}
      </div>
    )
  }
}