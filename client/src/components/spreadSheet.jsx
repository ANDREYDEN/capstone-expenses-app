import React from "react"
import ReactDOM from "react-dom"

export default class SpreadSheet extends React.Component {
  constructor(props) {
    super(props)
    this.members = props.members
    this.state = { entries: props.entries || [] }
    this.initEntryList = props.entries || []
  }

  componentDidMount() {

  }

  inputChange(e) {
    console.log(e)
  }

  addEntry(e) {
    const newEntry = {
      name: "",
      prise: "",
      userChecked: []
    }
    this.setState({ entries: this.state.entries.concat([newEntry]) })
    console.log(e)
  }

  render() {
    // const memberName = this.
    const memberHeaders = this.members.map(member => {
      return (
        <th>
          {member.name}
        </th>
      )
    })

    const onInputChange = this.inputChange.bind(this)
    const entries = this.state.entries.map(entry => {
      const checks = this.members.map(member => {
        return (
          <td>
            <input type="checkbox" onChange={onInputChange} data-type="paidCheck" data-userid={member._id}/>
          </td>
        )
      })
      return (
        <tr>
          <td>
            <input type="text" onChange={onInputChange} data-type="name"/>
          </td>
          <td>
            $<input type="text" onChange={onInputChange} data-type="prise"/>
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
                Prise
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
