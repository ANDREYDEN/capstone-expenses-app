import React from "react"
import ReactDOM from "react-dom"

import { addNewEntry, updateEntry } from "../api/index.js"

import { differ, debounce } from "../utils.js"

export default class SpreadSheet extends React.Component {
  constructor(props) {
    super(props)
    this.members = props.members
    this.state = { entries: props.entries || [] }
    // HACK: this stores a duplicate of an object instead of link to it
    // This might need rethinking
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
        updateEntry(this.props.sheetId, index, entry)
      })
    }, 1000)
  }

  componentDidMount() {

  }

  inputChange(e) {
    const { type, userid, index } = e.target.dataset
    const entry = this.state.entries[index]
    if (type === "name") {
      entry.name = e.target.value
    }
    if (type === "price") {
      entry.price = parseFloat(e.target.value)
    }
    if (type === "paidCheck") {
      entry.userCheckedIds[userid] = e.target.checked
    }
    this.updateEntries()
  }

  addEntry(e) {
    addNewEntry(this.props.sheetId).then(res => {
      this.setState({ entries: this.state.entries.concat([res.data.entry]) })
      this.initEntryList.push(JSON.parse(JSON.stringify(res.data.entry)))
    }).catch(console.log)
  }

  render() {
    // const memberName = this.
    const memberHeaders = this.members.map((member, index) => {
      return (
        <th key={index}>
          {member.name}
        </th>
      )
    })

    const onInputChange = this.inputChange.bind(this)
    const entries = this.state.entries.map((entry, index) => {
      const checks = this.members.map(member => {
        return (
          <td key={member._id}>
            <input type="checkbox" onChange={onInputChange}
              data-type="paidCheck"
              data-userid={member._id}
              data-index={index}
            />
          </td>
        )
      })
      return (
        <tr key={index}>
          <td>
            <input type="text" onChange={onInputChange} data-type="name" data-index={index}/>
          </td>
          <td>
            $<input type="text" onChange={onInputChange} data-type="price" data-index={index}/>
          </td>
          {checks}
        </tr>
      )
    })

    return (
      <div>
        <table>
          <thead>
            <tr>
              <th>
                Item Name
              </th>
              <th>
                Price
              </th>
              {memberHeaders}
            </tr>
          </thead>
          <tbody>
            {entries}
          </tbody>
        </table>
        <button onClick={this.addEntry.bind(this)}>+</button>
      </div>
    )
  }
}
