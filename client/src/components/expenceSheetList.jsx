import React from 'react'
import ReactDOM from 'react-dom'
import { createNewExpenceSheet } from '../api/index.js'

export default class ExpenceSheetList extends React.Component {
  componentDidMount() {
  }

  addNewExpenceSheet() {
    console.log("clicked")
    createNewExpenceSheet().then(res => console.log(res)).catch(err => console.error(err))
    // TODO: post expence sheet
  }

  render() {

    // TODO: implement getting the expence sheets
    const sheets = [{ name: "Dimas Costco Trip" }];
    const items = sheets.map((sheet, index) => {
      return <li key={index}>{sheet.name}</li>
    });

    return (
      <div className="expence-sheet-container">
        <ul>
          {items}
          <li>
            <button onClick={this.addNewExpenceSheet}>Add New One</button>
          </li>
        </ul>
      </div>
    )
  }
}
