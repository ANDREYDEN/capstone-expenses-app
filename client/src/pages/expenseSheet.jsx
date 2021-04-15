import React from "react"
import ReactDOM from "react-dom"
import axios from "axios"
import { useParams } from "react-router-dom"

import Spinner from "../components/spinner.jsx"
import SpreadSheetTabs from "../components/spreadSheetTabs.jsx"
import ExpenseEntryCardEditable from "../components/expenseEntryCardEditable.jsx"

import { getSheetById, updateSheet, getGroupMembers, updateEntries, addNewEntry } from "../api/index.js"
import { differ, debounce } from  "../utils.js"

import "../styles/expenseSheet.scss"

export default class ExpenseSheetList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      confirmedSheetWithServer: false,
      sheet: { 
        name: "",
        store: "",
        createdAt: "",
        createdBy: "",
        entries: [],
        taxIncluded: false,
        usersPaidIds: []
      },
      receivedGroupMembers: false,
      receivedExpenses: true,
      addEntry: false,
      editEntry: null
    }
    this.groupId = null
    this.sheetId = props.match.params.id

    this.sheetName = React.createRef()
    this.storeName = React.createRef()
    this.taxIncluded = React.createRef()
    // This will do the database call then the user finished updateing the input fields
    this.updateDocs = debounce(() => {
      const currentDoc = this.state.sheet;
      const update = differ(currentDoc, {
        name: this.sheetName.current.value,
        store: this.storeName.current.value,
        taxIncluded: this.taxIncluded.current.checked,
      })
      if (Object.keys(update).length) {
        updateSheet(this.sheetId, update).then(res => {
          this.setState({ receivedGroupMembers: true })
          this.members = res.data.members
        }).catch(console.error)
      }
    }, 1000).bind(this)
  }

  componentDidMount() {
    getSheetById(this.sheetId).then(res => {
      this.setState({
        serverConfirmed: true,
        sheet: res.data.expenseSheet
      })
    }).catch(err => {
      // TODO: user notifications
      this.setState({
        serverConfirmed: true,
        sheet: null
      })
      console.log(err)
    })
  }

  componentDidUpdate() {
    const sheet = this.state.sheet
    if (sheet.groupId && sheet.groupId !== this.groupId) {
      this.groupId = sheet.groupId
      getGroupMembers(sheet.groupId).then(res => {
        this.setState({
          receivedGroupMembers: true,
          members: res.data.members
        })
      }).catch(console.error)
    }
  }

  editEntry(entry) {
    this.setState({ entry })
  }

  updateEntry(entry) {
    if (this.state.addEntry) {
      if (! entry.name) {
        this.setState({ addEntry: false })
        return
      }
      addNewEntry(this.sheetId, entry).then(res => {
        const newEntry = res.data.entry
        this.state.sheet.entries.push(newEntry)
        this.setState({ sheet: this.state.sheet, addEntry: false })
      }).catch(console.error)
    }
    else if (this.state.entry) {
      if (!entry.name) {
        console.error("item needs a name")
        return
      }
      const diff = differ(this.state.entry, entry)
      if (Object.keys(diff).length) {
        updateEntries(this.sheetId, [{ index: entry.id, entry: diff }]).then(res => {
          if ("id" in entry) {
            if ("name" in diff) {
              this.state.sheet.entries[entry.id].name = diff.name
            }
            if ("price" in diff) {
              this.state.sheet.entries[entry.id].price = diff.price
            }
            this.setState({ sheet: this.state.sheet, entry: null })
          }
        }).catch(console.error)
      }
    }
  }

  render() {
    let spreadSheetTabs = <Spinner />
    if (this.state.receivedGroupMembers && this.state.receivedExpenses && this.state.sheet) {
      spreadSheetTabs = <SpreadSheetTabs
        members={this.state.members}
        sheetId={this.sheetId}
        entries={this.state.sheet.entries.map((entry, index) => {
          entry["id"] = index
          return entry
        })}
        editEntry={this.editEntry.bind(this)}
      />
    }



    if (this.state.serverConfirmed) {
      if (this.state.sheet) {
        const sheet = this.state.sheet
        return (
          <div className="expense-sheet-container">
            <label htmlFor="">Expense Sheet Name:</label>
            <input type="text" name="" ref={this.sheetName} defaultValue={sheet.name} onChange={this.updateDocs}/>
            <br/>
            <label htmlFor="">Store Name:</label>
            <input type="text" name="" ref={this.storeName} defaultValue={sheet.store} onChange={this.updateDocs}/>
            <br/>
            <label htmlFor="">Tax Included:</label>
            <input type="checkbox" name="" ref={this.taxIncluded} defaultChecked={this.state.sheet.taxIncluded} onChange={this.updateDocs}/>
            <br/>
            <span>Date: {sheet.createdAt}</span>
            <br/>
            <span>Created By: {sheet.createdBy}</span>
            {spreadSheetTabs}
            <button className="add-item-btn" onClick={() => this.setState({ addEntry: true })}>
              <span>+</span>
            </button>
            <ExpenseEntryCardEditable entry={this.state.entry} addEntry={this.state.addEntry} onSave={this.updateEntry.bind(this)}/>
          </div>
        )
      }
      return (
        <div className="expense-sheet-container">
          Item is not found.
        </div>
      )
    }
    return <Spinner />
  }
}
