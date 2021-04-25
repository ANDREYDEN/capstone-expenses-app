import React from "react"
import ReactDOM from "react-dom"
import { Link } from "react-router-dom"

import PullToRefresh from "react-simple-pull-to-refresh"
import SpinnerPreload from "../components/spinner.jsx"

import Spinner from "../components/spinner.jsx"
import SpreadSheetTabs from "../components/spreadSheetTabs.jsx"
import ExpenseEntryCardEditable from "../components/expenseEntryCardEditable.jsx"

import { FaArrowLeft } from "react-icons/fa"

import { getSheetById, updateSheet, getGroupMembers, updateEntries, addNewEntry, deleteEntry } from "../api/index.js"
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

  deleteCurrentEntry() {
    const entry = this.state.entry
    if (entry) {
      deleteEntry(this.sheetId, entry).then((res) => {
        const sheet = this.state.sheet
        sheet.entries.splice(entry.id, 1) // removes current entry from the sheet
        // NOTE: decrease all of the indexes following the entry
        sheet.entries = sheet.entries.map(e => {
          if (e.id > entry.id) {
            e.id--
          }
          return e
        })
        this.setState({ sheet, entry: null })
      }).catch(console.error)
    }
  }

  duplicateCurrentEntry() {
    const entry = this.state.entry
    if (entry) {
      addNewEntry(this.sheetId, entry).then(res => {
        const newEntry = res.data.entry
        this.state.sheet.entries.push(newEntry)
        this.setState({ sheet: this.state.sheet, entry: null })
      }).catch(console.error)
    }
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
      else {
        this.setState({ entry: null })
      }
    }
  }

  render() {
    const userId = window.userId()
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
        const summary = this.state.sheet.entries.reduce((memo, item) => {
          if (this.state.sheet.createdBy !== userId) {
            if (item.userCheckedIds[userId]) {
              memo.owe += item.price / (Object.keys(item.userCheckedIds).filter(key => item.userCheckedIds[key]).length || 1)
            }
          }
          memo.total += item.price
          return memo
        }, { total: 0, owe: 0 })
        const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
        const createdAt = new Date(sheet.createdAt)
        const date = `${createdAt.getDate()} ${months[createdAt.getMonth()]}`

        const payer = (this.state.members || []).find(m => m._id === sheet.createdBy)
        return (
          <div className="expense-sheet-container">
            <PullToRefresh onRefresh={() => new Promise(window.location.reload())} pullingContent="" refreshingContent={<SpinnerPreload />}>
              <div className="expense-sheet-header">
                <div className="row arrow-back">
                  <Link to={{
                    pathname: `/home`,
                  }}>
                    <FaArrowLeft />
                  </Link>
                </div>
                <div className="row store">
                  <span>{sheet.store}</span>
                </div>
                <div className="row date">
                  <span>{date}</span>
                </div>
                <div className="row payer">
                  <span>Payer</span>
                  <span className="pull-right">{payer?.name || "N/A"}</span>
                </div>
                <div className="row total">
                  <span>Total</span>
                  <span className="pull-right">{summary.total.toFixed(2)}</span>
                </div>
                {this.state.sheet.createdBy !== userId ? (
                  <div className="row owe">
                    <span>You owe</span>
                    <span className="pull-right">{summary.owe.toFixed(2)}</span>
                  </div>
                ) : null }
              </div>
              {spreadSheetTabs}
            </PullToRefresh>
            <button className="add-item-btn" onClick={() => this.setState({ addEntry: true })}>
              <span>+</span>
            </button>
            <ExpenseEntryCardEditable
              entry={this.state.entry}
              addEntry={this.state.addEntry}
              onSave={this.updateEntry.bind(this)}
              onDelete={this.deleteCurrentEntry.bind(this)}
              onDuplicate={this.duplicateCurrentEntry.bind(this)}
            />
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
