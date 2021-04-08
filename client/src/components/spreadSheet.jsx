import React from "react"
import ReactDOM from "react-dom"
import { SwipeableList, SwipeableListItem, ActionAnimations } from "@sandstreamdev/react-swipeable-list"
import "@sandstreamdev/react-swipeable-list/dist/styles.css"
import "../styles/expenseSheet.scss"
import { FaTimes, FaCheck } from "react-icons/fa"

import { addNewEntry, updateEntry } from "../api/index.js"

import { differ, debounce } from "../utils.js"

import ExpenseCard from "./expenseEntryCard.jsx"

export default class SpreadSheet extends React.Component {
  constructor(props) {
    super(props)
    this.userId = window.userId()
    const entries = (props.entries || []).map(e => {
      e["id"] = Math.random()
      return e
    })
    this.state = { entries }
    // // HACK: this stores a duplicate of an object instead of link to it
    // // This might need rethinking
    this.initEntryList = JSON.parse(JSON.stringify(props.entries || []))

    this.updateEntries = debounce(() => {
      const entriesAffected = differ(this.initEntryList, this.state.entries)
      const update = Object.keys(entriesAffected).map(index => {
        return {
          index,
          entry: differ(this.initEntryList[index], this.state.entries[index])
        }
      }).forEach(({ index, entry }) => {
        // TODO: implement a methond of updating multiple queries at once
        updateEntry(this.props.sheetId, index, entry).then(res => {
          this.setState({ entries: this.state.entries })
          this.initEntryList = JSON.parse(JSON.stringify(this.state.entries))
        }).catch(console.log)
      })
    }, 500)
  }

  componentDidMount() {

  }

  // inputChange(e) {
  //   const { type, userid, index } = e.target.dataset
  //   const entry = this.state.entries[index]
  //   if (type === "name") {
  //     entry.name = e.target.value
  //   }
  //   if (type === "price") {
  //     entry.price = parseFloat(e.target.value)
  //   }
  //   if (type === "paidCheck") {
  //     entry.userCheckedIds[userid] = e.target.checked
  //   }
  //   this.updateEntries()
  // }

  // addEntry(e) {
  //   addNewEntry(this.props.sheetId).then(res => {
  //     this.setState({ entries: this.state.entries.concat([res.data.entry]) })
  //     this.initEntryList.push(JSON.parse(JSON.stringify(res.data.entry)))
  //   }).catch(console.log)
  // }

  checkItem(id) {
    const entry = this.state.entries.find(entry => entry.id === id)
    entry.userCheckedIds[this.userId] = true
    this.updateEntries()
  }

  dismissItem(id) {
    const entry = this.state.entries.find(entry => entry.id === id)
    entry.userCheckedIds[this.userId] = false
    this.updateEntries()
  }

  render() {
    if (!this.state.entries.length) {
      return <h3 align="center">No Items Here</h3>
    }
    const members = this.props.members
    const items = this.state.entries.map((entry, index) => {
      return (
        <SwipeableListItem
          key={entry.id}
          swipeLeft={{
            content: <div className="check-item"><FaCheck /></div>,
            action: () => this.checkItem(entry.id)
          }}
          swipeRight={{
            content: <div className="dismiss-item"><FaTimes /></div>,
            actionAnimation: ActionAnimations.RETURN,
            action: () => this.dismissItem(entry.id)
          }}
          onSwipeProgress={progress => console.info(`Swipe progress: ${progress}%`)}
        >
          <ExpenseCard
            entry={entry}
            members={members}
          />
        </SwipeableListItem>
      )
    })

    return (
      <SwipeableList
        threshold={0.25}
      >
        {items}
      </SwipeableList>
    )
  }
}
