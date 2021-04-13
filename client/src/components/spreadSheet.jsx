import React from "react"
import ReactDOM from "react-dom"
import { SwipeableList, SwipeableListItem, ActionAnimations } from "@sandstreamdev/react-swipeable-list"
import "@sandstreamdev/react-swipeable-list/dist/styles.css"
import "../styles/expenseSheet.scss"
import { FaTimes, FaCheck } from "react-icons/fa"

import { addNewEntry, updateEntries } from "../api/index.js"

import { differDeep, debounce } from "../utils.js"

import ExpenseCard from "./expenseEntryCard.jsx"

export default class SpreadSheet extends React.Component {
  constructor(props) {
    super(props)
    this.userId = window.userId()
    const entries = (props.entries || [])
    this.state = { entries }
    // // HACK: this stores a duplicate of an object instead of link to it
    // // This might need rethinking
    this.initEntryList = JSON.parse(JSON.stringify(entries || []))

    this.updateEntries = debounce(() => {
      const entriesAffected = differDeep(this.initEntryList, this.state.entries)
      updateEntries(this.props.sheetId, Object.keys(entriesAffected).map(index => {
        return { index: this.state.entries[index].id, entry: entriesAffected[index] }
      })).then(res => {
        this.setState({ entries: this.state.entries })
        this.initEntryList = JSON.parse(JSON.stringify(this.state.entries))
      }).catch(console.log)
    }, 500)
  }

  componentDidMount() {

  }

  componentDidUpdate() {
    // HACK: probably neeeds to be figured. The items do not refresh whn you add new ones
    if (this.state.entries.length !== (this.props.entries || []).length) {
      this.setState({ entries: this.props.entries })
    }
  }

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
            userId={this.userId}
            editEntry={this.props.editEntry}
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
