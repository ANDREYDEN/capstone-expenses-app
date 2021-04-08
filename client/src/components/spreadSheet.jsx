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
    const entries = (props.entries || []).map(e => {
      e["id"] = Math.random()
      return e
    })
    this.state = { entries }
    // this.members = props.members
    // this.state = { entries: props.entries || [] }
    // // HACK: this stores a duplicate of an object instead of link to it
    // // This might need rethinking
    // this.initEntryList = JSON.parse(JSON.stringify(props.entries || []))

    // this.updateEntries = debounce(() => {
    //   const entriesAffected = differ(this.initEntryList, this.state.entries)
    //   const update = Object.keys(entriesAffected).map(index => {
    //     return {
    //       index,
    //       entry: differ(this.initEntryList[index], this.state.entries[index])
    //     }
    //   }).forEach(({ index, entry }) => {
    //     // TODO: implement a methond of updating multiple queries at once
    //     updateEntry(this.props.sheetId, index, entry).then(res => {
    //       this.setState({ entries: this.state.entries })
    //       this.initEntryList = JSON.parse(JSON.stringify(this.state.entries))
    //     }).catch(console.log)
    //   })
    // }, 500)
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

  render() {
    const deleteItem = (id) => {
      this.setState({ entries: this.state.entries.filter(entry => entry.id !== id) })
    }
    const members = this.props.members
    const items = this.state.entries.map((entry, index) => {
      return (
        <SwipeableListItem
          key={entry.id}
          swipeLeft={{
            content: <div className="check-item"><FaCheck /></div>,
            action: () => console.info("swipe action triggered")
          }}
          swipeRight={{
            content: <div className="dismiss-item"><FaTimes /></div>,
            actionAnimation: ActionAnimations.REMOVE,
            action: () => {
              deleteItem(entry.id)
            }//console.info("swipe action triggered")
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


  //   const memberHeaders = this.members.map((member, index) => {
  //     return (
  //       <th key={index}>
  //         {member.name}
  //       </th>
  //     )
  //   })

  //   const onInputChange = this.inputChange.bind(this)
  //   const entries = this.state.entries.map((entry, index) => {
  //     const checks = this.members.map(member => {
  //       return (
  //         <td key={member._id}>
  //           <input type="checkbox" onChange={onInputChange}
  //             data-type="paidCheck"
  //             data-userid={member._id}
  //             data-index={index}
  //             defaultChecked={entry.userCheckedIds[member._id]}
  //           />
  //         </td>
  //       )
  //     })
  //     return (
  //       <tr key={index}>
  //         <td>
  //           <input type="text"
  //             onChange={onInputChange}
  //             data-type="name"
  //             data-index={index}
  //             defaultValue={entry.name}
  //           />
  //         </td>
  //         <td>
  //           $<input type="text"
  //           onChange={onInputChange}
  //           data-type="price"
  //           data-index={index}
  //           defaultValue={entry.price}
  //         />
  //         </td>
  //         {checks}
  //       </tr>
  //     )
  //   })

  //   const summary = this.state.entries.reduce((memo, entry) => {
  //     // Filters those who have { userId: true }
  //     const usersPaid = Object.keys(entry.userCheckedIds).filter(userId => entry.userCheckedIds[userId])
  //     const pricePerUser = entry.price / usersPaid.length
  //     memo.overall += entry.price
  //     usersPaid.forEach(userId => {
  //       if (!memo[userId]) {
  //         memo[userId] = 0
  //       }
  //       memo[userId] += pricePerUser
  //     })
  //     return memo
  //   }, { overall: 0 })

  //   const membersSummary = this.members.map((member, index) => {
  //     return (
  //       <th key={index}>
  //         ${summary[member._id] || "0.00"}
  //       </th>
  //     )
  //   })

  //   const bottomRow = (
  //     <tr>
  //       <td>
  //       </td>
  //       <td>
  //         Total: {summary.overall}
  //       </td>
  //       {membersSummary}
  //     </tr>
  //   )

  //   return (
  //     <div>
  //       <table>
  //         <thead>
  //           <tr>
  //             <th>
  //               Item Name
  //             </th>
  //             <th>
  //               Price
  //             </th>
  //             {memberHeaders}
  //           </tr>
  //         </thead>
  //         <tbody>
  //           {entries}
  //           {bottomRow}
  //         </tbody>
  //       </table>
  //       <button onClick={this.addEntry.bind(this)}>+</button>
  //     </div>
  //   )
  // }
  }
}
